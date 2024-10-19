const express = require("express");
const router = express.Router();
const studentModel = require("../models/studentModel");

// Route to update student's nickname
router.post("/", async (req, res) => {
  const { oldNickname, newNickname, ipArray } = req.body;

  try {
    const result = await studentModel.updateMany(
      { Name: oldNickname, IP: { $in: ipArray } },
      { $set: { Name: newNickname } }
    );

    if (result.nModified > 0) {
      res.status(200).json({ message: "Nickname updated successfully" });
    } else {
      res.status(200).json({
        message: "No records updated. Check if the old nickname and IP match.",
      });
    }
  } catch (error) {
    console.error("Error updating nickname:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
