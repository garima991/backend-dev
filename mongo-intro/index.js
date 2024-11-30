const fs = require("fs");
const express = require("express");
const students = require("./public/students.json");
const mongoose = require("mongoose");
const port = 3200;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/studentsdb").then(() => {
  console.log("Connected to MongoDB Successfully !");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
})

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  batch: {
    type: String,
  },
}, { timestamps: true });

const Students = mongoose.model("Student", schema);

//  {
//    id: 12312,
//    name: "john",
//    batch: "Batch A",
//  }
//
// name : {
//   type: string,
//   required: true
// },
// batch : {
//   type: string,
//   required: true
//}

function generateRandomId(length = 20) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
}

function mymiddleware(request, response, next) {
  console.log("Middleware is called!");
  next();
}

app.use(express.urlencoded({ extended: false }));
app.use(mymiddleware);

app
  .route("/api/students")
  .post((request, response) => {
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
  })
  .get(async (request, response) => {
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
  })
  .patch(async (request, response) => {
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
  })

  .delete((request, response) => {
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
  });

app.get("/api/students/:studentId", (request, response) => {
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
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
