const fs = require("fs");
const express = require("express");
const students = require("./public/students.json");
const { startMongoDB } = require("./connections");
const { Students } = require("./models/students");
const mymiddleware = require("./middlewares/test");
const port = 3200;
const app = express();


const studentRouter = require("./routes/students");

startMongoDB("studentsdb");

app.use(express.urlencoded({ extended: false }));
app.use(mymiddleware); 
app.use("/api/students",studentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
