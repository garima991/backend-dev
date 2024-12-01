const express = require("express");
const app = express();
const cors = require("cors");
const todoRouter = require("./routes/todo");
const connectToDB = require("./connections/index");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to MongoDB
connectToDB("todo");

// routes
app.use("/api/todos", todoRouter);

// listener
app.listen(5055, () => {
  console.log("Server is running on port 5055");
});