import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Tasklist from "../components/Tasklist";
import Button from "../components/Button";
import { fetchTasks, addTask, updateTask, deleteTask } from "../api/task";

function Tasks() {
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuthError = useCallback(() => {
    localStorage.removeItem("token");
    toast.error("Session expired. Please login again.");
    navigate("/login");
  }, [navigate]);

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
        if (err.message && err.message.includes("403")) {
          handleAuthError();
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    initializeApp();
  }, [navigate, handleAuthError]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      if (!newStartDate || !newEndDate) {
        toast.error("Please select both start and end dates");
        return;
      }

      const created = await addTask(newTask, newStartDate, newEndDate);
      if (created.message) {
        toast.error(created.message);
        return;
      }
      setTask([...tasks, created]);
      setNewTask("");
      setNewStartDate("");
      setNewEndDate("");
      toast.success("Task added");
    } else {
      toast.error("Task can't be empty");
    }
  };

  const handleDeleteTask = async (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    await deleteTask(id);
    setTask(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted");
  };

  const onToggleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    if (!task.completed) {
      // Mark task as completed
      const updated = await updateTask(id, { completed: true });
      setTask(tasks.map((t) => (t.id === id ? updated : t)));
      toast.success("Task completed!");

      // Automatically delete the completed task after a short delay
      setTimeout(async () => {
        try {
          await deleteTask(id);
          setTask(tasks.filter((t) => t.id !== id));
          toast.success("Completed task removed");
        } catch (error) {
          console.error("Error deleting completed task:", error);
        }
      }, 2000); // Delete after 2 seconds
    } else {
      // Unmark task as completed (if needed)
      const updated = await updateTask(id, { completed: false });
      setTask(tasks.map((t) => (t.id === id ? updated : t)));
    }
  };

  const onUpdateTask = (id, task, startDate, endDate) => {
    setEditId(id);
    setEditTask(task);
    setEditStartDate(startDate || "");
    setEditEndDate(endDate || "");
  };

  const handleEditSave = async () => {
    if (!editStartDate || !editEndDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    const updated = await updateTask(editId, {
      task: editTask,
      startDate: editStartDate,
      endDate: editEndDate,
    });

    if (updated.message) {
      toast.error(updated.message);
      return;
    }

    setTask(tasks.map((t) => (t.id === editId ? updated : t)));
    setEditId(null);
    setEditTask("");
    setEditStartDate("");
    setEditEndDate("");
    toast.success("Task updated");
  };

  // Update end date minimum when start date changes
  const handleStartDateChange = (e) => {
    setNewStartDate(e.target.value);
    // If end date is before new start date, clear it
    if (newEndDate && e.target.value > newEndDate) {
      setNewEndDate("");
    }
  };

  const handleEditStartDateChange = (e) => {
    setEditStartDate(e.target.value);
    // If end date is before new start date, clear it
    if (editEndDate && e.target.value > editEndDate) {
      setEditEndDate("");
    }
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
        <div className="flex gap-2">
          <div className="flex flex-col">
            <label className="block mb-1 text-xs text-center text-gray-600">
              Start Date
            </label>
            <input
              type="date"
              value={newStartDate}
              onChange={handleStartDateChange}
              min={new Date().toISOString().split("T")[0]}
              className="px-2 py-2 rounded-md border border-gray-300 border-solid shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-1 text-xs text-center text-gray-600">
              End Date
            </label>
            <input
              type="date"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              min={newStartDate || new Date().toISOString().split("T")[0]}
              className="px-2 py-2 rounded-md border border-gray-300 border-solid shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
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
          <div className="flex gap-2">
            <div className="flex flex-col">
              <label className="block mb-1 text-xs text-center text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                value={editStartDate}
                onChange={handleEditStartDateChange}
                min={new Date().toISOString().split("T")[0]}
                className="px-2 py-2 rounded-md border border-gray-300 border-solid shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-xs text-center text-gray-600">
                End Date
              </label>
              <input
                type="date"
                value={editEndDate}
                onChange={(e) => setEditEndDate(e.target.value)}
                min={editStartDate || new Date().toISOString().split("T")[0]}
                className="px-2 py-2 rounded-md border border-gray-300 border-solid shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
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
