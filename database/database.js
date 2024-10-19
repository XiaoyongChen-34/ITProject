// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://admin:admin@parsonsproblem.5ux2h.mongodb.net/parson's"
);

// Middleware to add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Import routes
const insertStudentRoute = require("./routes/insertStudent");
const updateNicknameRoute = require("./routes/updateNickname");
const getStudentRoute = require("./routes/getStudent");
const statsRoute = require("./routes/stats");

// Use routes
app.use("/insertStudent", insertStudentRoute);
app.use("/updateNickname", updateNicknameRoute);
app.use("/getStudent", getStudentRoute);
app.use("/stats", statsRoute);

// Start the server and listen on port 3001
app.listen(3001, () => {
  console.log("Database is running on port 3001");
});
