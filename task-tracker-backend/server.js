const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
const JWT_SECRET = 'mysecretkey123';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users=require('./users');
//users array


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
//login route
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Wrong email or password' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '15m',
  });
  res.json({ token, message: 'Login successful' });
});
