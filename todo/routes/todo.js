const express = require("express");
const { getTodos, createTodo, updateTodo, deleteTodo } = require("../controllers/todo");
const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/", updateTodo);
router.delete("/", deleteTodo);

module.exports = router;