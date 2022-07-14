const todoModel = require("../models/todosModel");
const mongoose = require("mongoose");

//Get All Todos
const getTodos = async (req, res) => {
  const todos = await todoModel.find({}).sort({ createAt: -1 });
  res.status(200).json(todos);
};

//Get A  Todos
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }
  const todo = await todoModel.findById(id);
  res.status(200).json(todo);
};

//Insert a todos
const createTodo = async (req, res) => {
  const { title, dow } = req.body;
  try {
    const todo = await todoModel.create({ title, dow });
    res.status(200).json(todo);
    console.log(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }
  const todo = await todoModel.findOneAndDelete({ _id: id });
  if (!todo) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }
  const todo = await todoModel.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!todo) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(todo);
};
module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
};
