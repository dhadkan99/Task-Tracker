require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const express = require("express");

// Import models
const User = require("./models/User");
console.log("User model:", User);
const Task = require("./models/Task");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey123";

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/tasktracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Please log in" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new User({
            email: profile.emails[0].value,
            password: bcrypt.hashSync("google-auth", 10),
            googleID: profile.id,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Google login
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "15m",
    });
    res.redirect(`http://localhost:3000/?token=${token}`);
  }
);

// Routes
app.get("/health", (req, res) => {
  res.send("Backend is up and running!");
});

// Task Routes
app.get("/api/tasks", authenticateJWT, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(
      tasks.map((task) => ({
        id: task.id,
        task: task.text,
        startDate: task.startDate,
        endDate: task.endDate,
        completed: task.completed,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.post("/api/tasks", authenticateJWT, async (req, res) => {
  try {
    const taskText = req.body.task;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    if (!taskText) {
      return res.status(400).json({ message: "Task is required" });
    }

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required" });
    }

    // Validate that start date is not in the past
    const startDateTime = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today

    if (startDateTime < today) {
      return res
        .status(400)
        .json({ message: "Start date cannot be in the past" });
    }

    // Validate that end date is not before start date
    const endDateTime = new Date(endDate);
    if (endDateTime < startDateTime) {
      return res
        .status(400)
        .json({ message: "End date cannot be before start date" });
    }

    const newTask = new Task({
      text: taskText,
      user: req.user.id,
      startDate: startDateTime,
      endDate: endDateTime,
      completed: false,
    });
    await newTask.save();
    res.status(201).json({
      id: newTask.id,
      task: newTask.text,
      startDate: newTask.startDate,
      endDate: newTask.endDate,
      completed: newTask.completed,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating task" });
  }
});

app.put("/api/tasks/:id", authenticateJWT, async (req, res) => {
  try {
    const updateFields = {};
    if (typeof req.body.completed !== "undefined")
      updateFields.completed = req.body.completed;
    if (typeof req.body.task !== "undefined") updateFields.text = req.body.task;

    // Handle start date updates
    if (typeof req.body.startDate !== "undefined") {
      const startDateTime = new Date(req.body.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDateTime < today) {
        return res
          .status(400)
          .json({ message: "Start date cannot be in the past" });
      }
      updateFields.startDate = startDateTime;
    }

    // Handle end date updates
    if (typeof req.body.endDate !== "undefined") {
      const endDateTime = new Date(req.body.endDate);
      const startDate = req.body.startDate
        ? new Date(req.body.startDate)
        : null;

      if (startDate && endDateTime < startDate) {
        return res
          .status(400)
          .json({ message: "End date cannot be before start date" });
      }
      updateFields.endDate = endDateTime;
    }

    const task = await Task.findOneAndUpdate(
      { id: parseInt(req.params.id), user: req.user.id },
      updateFields,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      id: task.id,
      task: task.text,
      startDate: task.startDate,
      endDate: task.endDate,
      completed: task.completed,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
});

// Delete a task
app.delete("/api/tasks/:id", authenticateJWT, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      id: parseInt(req.params.id),
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

// Debug/admin route to show all tasks in the database
app.get("/api/all-tasks", async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.json(allTasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all tasks" });
  }
});

// Auth Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "Email, username, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({
      email,
      password: bcrypt.hashSync(password, 10),
      username,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
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
      expiresIn: "15m",
    });

    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during login" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.json({
    message: "Logout successful. Please clear the token on the client side.",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
