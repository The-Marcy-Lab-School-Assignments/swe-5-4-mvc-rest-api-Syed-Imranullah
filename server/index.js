const express = require("express");
const path = require("path");

const app = express();
const pathToFrontend = path.join(__dirname, "../frontend");

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////

// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: "Buy groceries", isDone: false },
  { id: getId(), task: "Walk the dog", isDone: true },
  { id: getId(), task: "Read a book", isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

// TODO: GET /api/todos
// Response: 200, array of all todos
const getALlTodo = (req, res) => {
  res.status(200).json(todos);
};

// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id

const getALlTodoById = (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.status(200).json(todos);
};

// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body

const createTodo = (req, res) => {
  const {task} = req.body
  if (!task) return res.status(400).json({error: 'Task is required'})
    const newTodo = {id: getId(), task, isDone: false}
  todos.push(newTodo)
  res.status(201).json(newTodo)
}

// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id

const updateTodo = (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Not found" });
  const {isDone} = req.body
 if (typeof isDone === Boolean) todo.isDone = isDone
  res.status(200).json(todo)
}


// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id

// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)

////////////
//EndPoint
////////////

app.get("/api/todos", getALlTodo,);
app.get('/api/todos/:id', getALlTodoById)
app.post('/api/todos', createTodo)
app.get('/api/todos/:id', updateTodo)


const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
