const express = require("express");
const {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
  } = require("../controllers/students");
const studentRouter = express.Router();


studentRouter
  .route("/")
  .post(createStudent)
  .get(getStudents)
  .patch(updateStudent)
  .delete(deleteStudent);

studentRouter.get("/:studentId", getStudent);

module.exports = studentRouter;