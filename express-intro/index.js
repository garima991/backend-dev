const fs = require("fs");
const express = require("express");
const students = require("./public/students.json");
const port = 3000;
const app = express();


//  GET - /api/students - data of all students
//  GET - /api/students/:studentId - data of a student with studentId
//  GET - /api/students/:studentId/batch - batch of a student with studentId
//  POST - /api/students - create a new student
//  PUT - /api/students/:studentId - put a resource for a student with studentId
//  PATCH - /api/students/:studentId - update a student with studentId
//  DELETE - /api/students/:studentId - delete a student with studentId
 
//  {
//    id: 12312,
//    name: "john",
//    batch: "Batch A",
//  }
 

function generateRandomId(length = 20) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
}

function mymiddleware(request, response, next) {
    console.log("Middleware is called!")
    next();
}


app.use(express.urlencoded({ extended: false }));
app.use(mymiddleware)
app.use(mymiddleware)


app
  .route("/api/students")
  .post((request, response) => {
    // logic
    const { name, batch = "Basic Batch" } = request.body;
    if (name) {
      const id = generateRandomId();
      students.push({ id, name, batch });
      fs.writeFile("public/students.json", JSON.stringify(students), (err) => {
        if (err) {
          console.log(err);
          response.send({
            status: "error",
            message: "Error in creating a student!",
          });
        } else {
          response.send({
            status: "success",
            message: "Student is created successfully with id " + id + " !",
          });
        }
      });
    } else {
      response.status(400).send({
        status: "error",
        message: "Name is required!",
      });
    }
  })
  .get((request, response) => {
    console.log("Server Logic")
    response.setHeader("My-Name", "IceBear")
    response.json({
      status: "success",
      message: "List of all students",
      data: students,
    });
  })
  .patch((request, response) => {
    // logic
    response.send({
      status: "success",
      message: "Student is updated successfully!",
    });
  })
  .delete((request, response) => {
    console.log("Delete Request For : ", request.body);
    const { id } = request.body;
    if (id) {
      //   const exist = students.reduce((acc, student) => acc || student.id === id, false);
      if (students.reduce((acc, student) => acc || student.id === id, false)) {
        const newStudents = students.filter((student) => student.id !== id);
        fs.writeFile(
          "public/students.json",
          JSON.stringify(newStudents),
          (err) => {
            if (err) {
              console.log(err);
              response.status(400).send({
                status: "error",
                message: "Error in deleting a student!",
              });
            } else {
              response.send({
                status: "success",
                message: "Student with id " + id + " is deleted successfully!",
              });
            }
          }
        );
      } else {
        response.status(404).send({
          status: "error",
          message: "Student with id " + id + " is not found!",
        });
      }
    } else {
      response.status(400).send({
        status: "error",
        message: "Student Id is required!",
      });
    }
  });

app.get("/api/students/:studentId", (request, response) => {
  const { studentId } = request.params;
  response.send({
    status: "success",
    message: `Student with id ${studentId} is found!`,
  });
});
app.get("/api/students/:studentId/batch", (request, response) => {
  const { studentId } = request.params;
  response.send({
    status: "success",
    message: `Batch of student with id ${studentId} is found!`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});