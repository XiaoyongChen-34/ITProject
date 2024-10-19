const express = require("express");
const router = express.Router();
const studentModel = require("../models/studentModel");

// Route to get statistics
router.get("/", async (req, res) => {
  try {
    let { topics } = req.query; // 使用 let 代替 const

    // 如果topics是字符串，则将其转换为数组
    if (typeof topics === "string") {
        topics = topics.split(",");
    }

    if (!Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({ message: "Invalid topics list" });
    }

    // 获取去重后的学生数量
    const distinctStudentsCount = (await studentModel.distinct("Name")).length;

    // 统计有至少一次尝试的文档数量
    const totalDocumentsCount = await studentModel.countDocuments({
      "Attempt.0": { $exists: true },
    });

    // 统计最近一次尝试是正确的文档数量
    const trueResult = await studentModel.aggregate([
      {
        $project: {
          lastAttempt: { $arrayElemAt: ["$Attempt", 0] },
        },
      },
      {
        $match: {
          "lastAttempt.Correctness": "True",
        },
      },
      {
        $count: "totalCorrectAttempts",
      },
    ]);

    const totalCorrectAttempts =
      trueResult.length > 0 ? trueResult[0].totalCorrectAttempts : 0;
    const totalFalseAttempts = totalDocumentsCount - totalCorrectAttempts;

    // 统计过去7天的尝试数
    async function countDocumentsForLast7Days() {
      try {
        const result = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        today.setHours(today.getHours() + 11);

        for (let i = 0; i < 7; i++) {
          const startOfDay = new Date(today);
          startOfDay.setDate(today.getDate() - i);
          const endOfDay = new Date(startOfDay);
          endOfDay.setDate(startOfDay.getDate() + 1);

          const count = await studentModel.countDocuments({
            StartTime: { $gte: startOfDay, $lt: endOfDay },
            "Attempt.0": { $exists: true },
          });

          result.unshift(count);
        }

        return result;
      } catch (error) {
        console.error("查询时出错:", error);
      }
    }

    const last7Days = await countDocumentsForLast7Days();

    // 根据topics列表查询每个topic的数量
    const topicCounts = await studentModel.aggregate([
      {
        $match: {
          Topic: { $in: topics }, // 通过topics列表查询
          "Attempt.0": { $exists: true },
        },
      },
      {
        $group: {
          _id: "$Topic", // 按照Topic分组
          count: { $sum: 1 }, // 统计每个Topic的数量
        },
      },
    ]);

    const topicCountMap = {};
    topics.forEach((topic) => {
      const foundTopic = topicCounts.find((item) => item._id === topic);
      topicCountMap[topic] = foundTopic ? foundTopic.count : 0; // 如果没有找到，默认数量为0
    });

    // 返回结果
    res.status(200).json({
      totalStudent: distinctStudentsCount,
      attemptQuestions: totalDocumentsCount,
      trueCount: totalCorrectAttempts,
      falseCount: totalFalseAttempts,
      last7Days: last7Days,
      topicCounts: topicCountMap, // 返回每个topic对应的数量
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
});

module.exports = router;
