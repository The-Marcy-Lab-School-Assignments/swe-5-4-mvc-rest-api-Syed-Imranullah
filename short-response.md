# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:

The Todo Tracker `API` follows REST principles in a few important ways. First, it uses resource-based URLs like `/api/todos` and `/api/todos/:id`, which represent the todo resources instead of actions. This tells the client developer that the `API` is organized around resources and that each endpoint refers to a specific piece of data. Second, the `API` uses `HTTP` methods to show what action is happening. For example, `GET` retrieves todos, `POST` creates a new one, `PATCH` updates a todo, and `DELETE` removes one. Third, the `API` uses status codes to communicate the result of a request, such as `200` for success, `201` when a resource is created, `204` for a successful delete with no content, `400` for bad input, and `404` when something isn’t found.

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:

If data logic and `request/response` logic are mixed in the same file, the code becomes harder to manage and scale. Everything is tightly connected, so changing one part of the code can accidentally break another part. By separating them into a `model` and `controller`, each part has a clear responsibility. The `model` handles all interactions with the data, while the `controller` handles the `HTTP` requests and responses. This makes the code easier to read, maintain, and test because each layer focuses on a single job.

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

When a user clicks the checkbox to toggle a todo’s `isDone` field, the frontend sends a `PATCH` request to `/api/todos/:id`. In `server/index.js`, Express receives the request and routes it to the updateTodo controller function. Inside `server/controllers/todoControllers.js`, the controller reads the id from `req.params` and the update data from `req.body`, then calls the model’s update method. In `server/models/todoModel.js`, the update function finds the matching todo and updates the `isDone` value. The updated todo is returned to the controller, which then sends a `200` response with the updated todo back to the client.

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

Line 1 belongs in the controller because it reads the task value from `req.body`, which is part of handling the incoming request. Line 2 also belongs in the controller because validating the request and returning a `400` status is part of request handling. Line 3 belongs in the model because it creates the new `todo` object, which is related to managing the data structure. Line 4 also belongs in the model because pushing the new `todo` into the `todos` array is a data operation. Line 5 belongs in the controller because sending the `201` response is part of communicating the result of the request back to the client.