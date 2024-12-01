const Todo = require("../models/todo");

function getTodos(req, res) {
  Todo.find()
    .then((todos) => {
      res.send({
        status: "success",
        message: "List of all the Tasks",
        data: todos,
      });
    })
    .catch((err) => {
      res.send({ message: err });
    });
}

function createTodo(req, res) {
  Todo.create(req.body)
    .then((todo) => {
      res.send({
        status: "success",
        message: "Todo created successfully",
        data: todo,
      });
    })
    .catch((err) => {
      res.status(500).send({ status: "error", message: err });
    });
}

function updateTodo(req, res) {
  const { id, ...rest } = req.body;
  Todo.findByIdAndUpdate(id, rest, { new: true })
    .then((todo) => {
      res.send({
        status: "success",
        message: "Todo updated successfully",
        data: todo,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
}

function deleteTodo(req, res) {
  const { id } = req.body;
  Todo.findByIdAndDelete(id)
    .then((todo) => {
      res.send({
        status: "success",
        message: "Todo deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({ status: "error", message: err });
    });
}

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
