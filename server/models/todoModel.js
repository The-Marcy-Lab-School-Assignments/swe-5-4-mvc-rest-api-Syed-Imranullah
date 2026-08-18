let id = 1
const getId = () => id ++

const todos = [
  { id: getId(), task: "Buy groceries", isDone: false },
  { id: getId(), task: "Walk the dog", isDone: true },
  { id: getId(), task: "Read a book", isDone: false },
];

const list = () => {
  return [...todos];
};

const find = (id) => {
  const todo = todos.find((t) => t.id === id);
  return todo ? { ...todo } : null;
};

const create = (task) => {
  const newTodo = { id: getId(), task, isDone: false };
  todos.push(newTodo);
  return { ...newTodo };
};

const update = (id, changes) => {
  const todo = todos.find((t) => t.id === id);

  if (!todo) return null;

  if (typeof changes.isDone === "boolean") {
    todo.isDone = changes.isDone;
  }

  return { ...todo };
};

const destroy = (id) => {
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) return false;

  todos.splice(index, 1);
  return true;
};

module.exports = {
  list,
  find,
  create,
  update,
  destroy,
};

