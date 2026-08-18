const todoModel = require("../models/todoModel");

// GET /api/todos
const listTodos = (req, res) => {
  const todos = todoModel.list();
  res.status(200).json(todos);
};

// GET /api/todos/:id
const findTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todoModel.find(id);

  if (!todo) {
    return res.status(404).json({ message: "Error: Not found" });
  }

  res.status(200).json(todo);
};

// POST /api/todos
const createTodo = (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  const newTodo = todoModel.create(task);
  res.status(201).json(newTodo);
};

// PATCH /api/todos/:id
const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const changes = req.body;

  const updated = todoModel.update(id, changes);

  if (!updated) {
    return res.status(404).json({ message: "Error: Not found" });
  }

  res.status(200).json(updated);
};

// DELETE /api/todos/:id
const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);

  const deleted = todoModel.destroy(id);

  if (!deleted) {
    return res.status(404).json({ message: "Error: Not found" });
  }

  res.status(204).send();
};

module.exports = {
  listTodos,
  findTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};