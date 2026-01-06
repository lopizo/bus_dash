const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- In-memory data ---
let tasks = [
  { id: 1, title: "First task", completed: false }
];

// --- Health ---
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// --- Tasks ---
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: Date.now(),
    title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
