import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => console.error("Failed to load tasks"));
  }, []);

  const addTask = () => {
    if (!title.trim()) return;

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks(prev => [...prev, newTask]);
        setTitle("");
      });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Bus Dash — Tasks</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTask} style={{ marginLeft: "0.5rem" }}>
          Add
        </button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
