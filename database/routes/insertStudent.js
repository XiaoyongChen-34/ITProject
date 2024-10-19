const express = require("express");
const router = express.Router();
const studentModel = require("../models/studentModel"); // 引入studentModel
const convertTimeToMinutes = require("../helpers/convertTimeToMinutes"); // 引入convertTimeToMinutes辅助函数

// Route to insert or update student data
router.get("/", async (req, res) => {
  try {
    const {
      objectID,
      ip,
      time,
      topic,
      context,
      question,
      correctness,
      name,
      flag,
      studentCode,
    } = req.query;

    const splittedQuestion = question.split("$");
    const splittedStudentCode = studentCode.split("$");
    const timeInMinutes = convertTimeToMinutes(time);
    const currentDate = new Date();

    const existingPerformance = await studentModel.findOne({
      IP: ip,
      Topic: topic,
      Context: context,
      Question: splittedQuestion,
      Name: name,
    });

    if (existingPerformance) {
      existingPerformance.Attempt.unshift({
        Time: timeInMinutes,
        Correctness: correctness,
        SubmitTime: new Date(currentDate.getTime() + 10 * 60 * 60 * 1000),
        StudentCode: splittedStudentCode,
      });

      await existingPerformance.save();
      res.status(200).send(existingPerformance._id);
    } else {
      const newStudent = await studentModel.create({
        IP: ip,
        StartTime: new Date(currentDate.getTime() + 10 * 60 * 60 * 1000),
        Topic: topic,
        Context: context,
        Question: splittedQuestion,
        Name: name,
        Attempt: [],
        Flag: flag,
      });
      res.status(200).send(newStudent._id);
    }
  } catch (error) {
    res.status(500).send("Error inserting or updating student data");
  }
});

module.exports = router;
