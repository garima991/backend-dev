const { Students } = require("../models/students");

function createStudent(request, response){
    // logic
    const { name, batch = "Basic Batch" } = request.body;
    // ---- one way (using try and catch)--- 
    // ---- another way (using chaining) --
    const result = Students.create({
      id: generateRandomId(),
      name,
      batch,
    })
      .then((result) => {
        console.log(result);
        response.status(201).send({
          status: "success",
          message: "Student created successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        response.status(400).send({
          status: "error",
          message: "Error creating student",
          ...err,
        })
      })
  }

  async function getStudents (request, response) {
    try {
      const students = await Students.find(); // Fetch all students
      console.log("Fetched students :", students);
      // Setting a custom header (optional)
      // response.setHeader("My-Name", "IceBear");
      response.json({
        status: "success",
        message: "List of all students",
        data: students,
      });
    }
    catch (err) {
      console.error("Error fetching students:", err);
      response.status(500).send({
        status: "error",
        message: "Error fetching students",
        error: err.message,
      });
    }
  }

  async function updateStudent (request, response){
    const { id, name, batch } = request.body;
    Students.findByIdAndUpdate(id, { name, batch })
      .then((result) => {
        response.send({
          status: "success",
          message: "Student is updated successfully!",
          result,
        });
      })
      .catch((err) => {
        response.status(404).send({
          status: "error",
          message: "Student is not found!",
          ...err,
        });
      });
  }

  function deleteStudent(request, response) {
    const { id } = request.body;
    Students.findByIdAndDelete(id)
      .then((result) => {
        response.send({
          status: "success",
          message: "Student is deleted successfully!",
        });
      })
      .catch((err) => {
        console.error(err);
        response.status(404).send({
          status: "error",
          message: "Student not found !",
          ...err,
        });
      });
  }

  function getStudent (request, response){
    Students.findById(request.params.studentId)
      .then((result) => {
        response.send({
          status: "success",
          message: "Student is found!",
          result,
        });
      })
      .catch((err) => {
        response.status(404).send({
          status: "error",
          message: "Student is not found!",
          ...err,
        });
      });
    }
  module.exports = {createStudent, getStudents, getStudent, updateStudent, deleteStudent}