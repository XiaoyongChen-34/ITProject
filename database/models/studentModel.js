const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    IP: String,
    StartTime: Date,
    Topic: String,
    Context: String,
    Question: Array,
    Name: String,
    Attempt: [
      {
        Time: Number,
        Correctness: String,
        SubmitTime: Date,
        StudentCode: Array,
      },
    ],
    Flag: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("student", studentSchema);
