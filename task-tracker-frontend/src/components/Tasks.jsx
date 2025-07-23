import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import Tasklist from "../components/Tasklist";
import Button from "../components/Button";
import { fetchTasks, addTask, updateTask, deleteTask } from "../api/task";
// import { GoogleOAuthProvider } from "@react-oauth/google";

function Tasks() {
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
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
  const handleAddTask = async () => {
    if (newTask.trim()) {
      const created = await addTask(newTask, newDueDate);
      setTask([...tasks, created]);
      setNewTask("");
      setNewDueDate("");
      toast.success("Task added");
    } else {
      toast.error("Task can't be empty");
    }
  };
  //delete task
  const handleDeleteTask = async (id) => {
    const task = tasks.find((task) => task._id === id);
    if (task && task.completed) {
      await deleteTask(id);
      setTask(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted");
    } else {
      toast.error("Only completed tasks can be deleted");
    }
  };

  const onToggleComplete = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    const updated = await updateTask(id, { completed: !task.completed });
    setTask(tasks.map((t) => (t._id === id ? updated : t)));
  };

  const onUpdateTask = (id, task, dueDate) => {
    setEditId(id);
    setEditTask(task);
    setEditDueDate(dueDate || "");
  };

  const handleEditSave = async () => {
    const updated = await updateTask(editId, {
      task: editTask,
      dueDate: editDueDate,
    });
    setTask(tasks.map((t) => (t._id === editId ? updated : t)));
    setEditId(null);
    setEditTask("");
    setEditDueDate("");
    toast.success("Task updated");
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
    // <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
    <div className="p-6 mx-auto mt-8 w-full max-w-7xl bg-white rounded-xl shadow">
      <h2 className="mb-2 text-xl font-bold text-gray-800">Hello</h2>
      {welcomeMessage && (
        <p className="mb-4 text-sm text-green-600">{welcomeMessage}</p>
      )}
      {/* error  */}
      <div className="flex gap-2 items-center mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 border-solid shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new task..."
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          className="px-2 py-2 rounded-md border border-gray-300 border-solid shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleAddTask}
          className="px-4 py-2 font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          + New Task
        </Button>
      </div>
      {editId && (
        <div className="flex gap-2 items-center mb-4">
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 border-solid shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Edit task..."
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="px-2 py-2 rounded-md border border-gray-300 border-solid shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleEditSave}
            className="px-4 py-2 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Save
          </Button>
          <Button
            onClick={() => setEditId(null)}
            className="px-4 py-2 font-medium text-white bg-gray-400 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </Button>
        </div>
      )}
      <Tasklist
        tasks={tasks}
        onDelete={handleDeleteTask}
        onToggleComplete={onToggleComplete}
        onUpdateTask={(id, task, dueDate) => onUpdateTask(id, task, dueDate)}
      />
    </div>
    // </GoogleOAuthProvider>
  );
}

export default Tasks;
