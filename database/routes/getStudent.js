const express = require("express");
const router = express.Router();
const studentModel = require("../models/studentModel");

// Route to get students with filters
router.get("/", (req, res) => {
  const { IP, Topic, Context, Correctness, Time, Name } = req.query;

  let query = {};

  if (IP) query.IP = IP;
  if (Topic) query.Topic = Topic;
  if (Context) query.Context = Context;
  if (Correctness) query.Correctness = Correctness;
  if (Name) query.Name = Name;

  if (Time) {
    let timeThreshold;
    if (Time === "3") timeThreshold = 3;
    else if (Time === "5") timeThreshold = 5;
    else if (Time === "10") timeThreshold = 10;
    else timeThreshold = -1;

    if (timeThreshold) {
      studentModel
        .find(query)
        .sort({ StartTime: -1 })
        .then((students) => {
          const filteredStudents = students.filter((student) => {
            if (timeThreshold != -1) {
              return student.Time <= timeThreshold;
            } else {
              return student.Time > 10;
            }
          });
          res.json(filteredStudents);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Server error");
        });
      return;
    }
  }

  studentModel
    .find(query)
    .sort({ StartTime: -1 })
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error");
    });
});

module.exports = router;
