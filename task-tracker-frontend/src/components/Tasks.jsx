import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Tasklist from "../components/Tasklist";
import Button from "../components/Button";

const getInitialTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};
function Tasks() {
  const [tasks, setTask] = useState(getInitialTasks);
  const [newtask, setNewTask] = useState("");

  useEffect(() => {
    // setWelcomeMessage("Welcome to Task tracker");
    // const timer = setTimeout(() => setWelcomeMessage(""), 3000);
    // return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newtask.trim()) {
      setTask([
        ...tasks,
        {
          id: Date.now(),
          text: newtask,
          completed: false,
        },
      ]);
      setNewTask("");
      toast.success("Task added");
    } else {
      toast.error("Task can't be empty");
    }
  };

  const deleteTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task && task.completed) {
      setTask(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted");
    } else {
      toast.error("Only completed tasks can be deleted");
    }
  };

  const onToggleComplete = (id) => {
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow p-6 w-full max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Hello</h2>
      <div className="flex gap-2 items-center mb-6">
        <input
          type="text"
          value={newtask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new task..."
        />
        <Button
          onClick={addTask}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700"
        >
          + New Task
        </Button>
      </div>

      <Tasklist
        tasks={tasks}
        onDelete={deleteTask}
        onToggleComplete={onToggleComplete}
      />
    </div>
  );
}

export default Tasks;
