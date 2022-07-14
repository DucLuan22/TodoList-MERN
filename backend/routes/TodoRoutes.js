const express = require("express");
const router = express.Router();
const {
  createTodo,
  deleteTodo,
  getTodos,
  getTodo,
  updateTodo,
} = require("../controllers/todoController");
//Get all todos
router.get("/q", getTodos);

//Get one todo
router.get("/q/:id", getTodo);

//Insert a todo

router.post("/p", createTodo);

//Delete on todo
router.delete("/d/:id", deleteTodo);

router.patch("/u/:id", updateTodo);
module.exports = router;
