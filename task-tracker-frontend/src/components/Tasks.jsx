import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Tasklist from "../components/Tasklist";
import Button from "../components/Button";
import { fetchTasks, addTask, updateTask, deleteTask } from "../api/task";

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

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const data = await fetchTasks();
        if (Array.isArray(data)) {
          setTask(data);
        } else {
          setError("Failed to load tasks: invalid response");
        }
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

  const handleDeleteTask = async (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    if (!taskToDelete.completed) {
      toast.warn("Only completed tasks can be deleted");
      return;
    }

    await deleteTask(id);
    setTask(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted");
  };

  const onToggleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = await updateTask(id, { completed: !task.completed });
    setTask(tasks.map((t) => (t.id === id ? updated : t)));
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
    setTask(tasks.map((t) => (t.id === editId ? updated : t)));
    setEditId(null);
    setEditTask("");
    setEditDueDate("");
    toast.success("Task updated");
  };

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
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto mt-8 w-full max-w-7xl bg-white rounded-xl shadow">
      <h2 className="mb-2 text-xl font-bold text-gray-800">Hello</h2>
      {welcomeMessage && (
        <p className="mb-4 text-sm text-green-600">{welcomeMessage}</p>
      )}

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
        onUpdateTask={onUpdateTask}
      />
    </div>
  );
}

export default Tasks;
