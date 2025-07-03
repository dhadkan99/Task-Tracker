import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Tasklist from "../components/Tasklist";
import Button from "../components/Button";
import { fetchTasks } from "../api/task";
const getInitialTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};
function Tasks() {
  const [tasks, setTask] = useState(getInitialTasks);
  const [newtask, setNewTask] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //iinitialize  and featch task form the backend
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const data = await fetchTasks();
        setTask(data);
        setWelcomeMessage("Welcome to Task tracker");
        const timer = setTimeout(() => setWelcomeMessage(""), 3000);
        return () => clearTimeout(timer);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    initializeApp();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //add tasks
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
  //delete task
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
  //loading
  if (loading) {
    return (
      <div className="p-6 mx-auto mt-8 w-full max-w-7xl bg-white rounded-xl shadow">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mx-auto mt-8 w-full max-w-7xl bg-white rounded-xl shadow">
        <p className="text-lg text-red-600">Error</p>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto mt-8 w-full max-w-7xl bg-white rounded-xl shadow">
      <h2 className="mb-2 text-xl font-bold text-gray-800">Hello</h2>
      {welcomeMessage && (
        <p className="mb-4 text-sm text-green-600">{welcomeMessage}</p>
      )}
      {/* error  */}

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
          className="px-4 py-2 font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
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
