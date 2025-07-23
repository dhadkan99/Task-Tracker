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

<<<<<<< Updated upstream
//get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

=======
// Task Routes
app.get("/api/tasks", authenticateJWT, async (req, res) => {
  try {
    console.log("[GET /api/tasks] user id:", req.user.id);
    const tasks = await Task.find({ user: req.user.id });
    console.log("[GET /api/tasks] tasks:", tasks);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});
//task creation
app.post("/api/tasks", authenticateJWT, async (req, res) => {
  try {
    console.log(
      "[POST /api/tasks] user id:",
      req.user.id,
      "text:",
      req.body.text
    );
    const newTask = new Task({
      title: req.body.text,
      user: req.user.id,
    });
    await newTask.save();
    console.log("[POST /api/tasks] created task:", newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
});

// Delete task
app.delete("/api/tasks/:id", authenticateJWT, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

// Update task
app.put("/api/tasks/:id", authenticateJWT, async (req, res) => {
  try {
    const updateFields = {};
    if (typeof req.body.completed !== "undefined")
      updateFields.completed = req.body.completed;
    if (typeof req.body.title !== "undefined")
      updateFields.title = req.body.title;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updateFields,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
});

// Auth Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    await newUser.save();
    // Generate JWT token after registration
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "55m",
    });

    res.json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Error during login" });
  }
});

app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user._id, role: req.user.role },
        JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.redirect(`http://localhost:3000/?token=${token}`);
    } catch (err) {
      res.redirect(`http://localhost:3000/login?error=authentication_failed`);
    }
  }
);

app.post("/api/auth/logout", (req, res) => {
  res.json({
    message: "Logout successful. Please clear the token on the client side.",
  });
});

// Start Server
>>>>>>> Stashed changes
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
