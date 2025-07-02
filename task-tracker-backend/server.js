const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

app.use(cors());
app.use(express.json());
//task array
let tasks = [
  { id: 1, text: "Task 1", completed: false },
  { id: 2, text: "Task 2", completed: false },
  { id: 3, text: "Task 3", completed: false },
];
//api call 
app.get("/", (req, res) => {
  res.send("Task Tracker API");
});
//health check path to check if the server is running
app.get("/health", (req, res) => {
  res.send("Hello Word");
});

//get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
