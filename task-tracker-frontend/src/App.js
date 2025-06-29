import Header from "./components/Header";
// import Button from "./components/Button";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import Sidebar from "./components/Sidebar";
import Tasklist from "./components/Tasklist";


function App() {
  // Initialize tasks state with data from localStorage
  const getInitialTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const [tasks, setTask] = useState(getInitialTasks);
  const [newtask, setNewTask] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    setWelcomeMessage("Welcome to Task tracker");
    const timer = setTimeout(() => setWelcomeMessage(""), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Save tasks to localStorage whenever tasks change
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
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container flex-grow p-4 mx-auto my-8">
  <div className="fixed top-[85px] left-1/2 transform -translate-x-1/2 w-full max-w-[700px] max-h-[calc(100vh-100px)] overflow-y-auto bg-white rounded-[16px] border-2 border-[#dadada] shadow-md p-6 flex flex-col z-[50]">
    <h2 className="mb-4 text-2xl font-semibold text-gray-800">
      Dashboard
    </h2>

    {/* Filter Buttons */}
    <div className="flex flex-wrap gap-2 mb-6">
      <button className="px-4 py-2 text-white bg-blue-600 rounded-md transition hover:bg-blue-700">
        Recent
      </button>
      <button className="px-4 py-2 text-white bg-green-600 rounded-md transition hover:bg-green-700">
        Today
      </button>
      <button className="px-4 py-2 text-white bg-yellow-500 rounded-md transition hover:bg-yellow-600">
        Upcoming
      </button>
      <button className="px-4 py-2 text-white bg-red-600 rounded-md transition hover:bg-red-900">
        Pending
      </button>
    </div>

    {welcomeMessage && (
      <div className="mb-4 text-green-600">{welcomeMessage}</div>
    )}

    <div className="flex gap-2 items-center mb-6">
      <input
        type="text"
        value={newtask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-grow px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter new task..."
      />
      <button
        type="button"
        onClick={addTask}
        className="px-4 py-2 text-white bg-blue-600 rounded-md transition-all duration-150 hover:bg-blue-700"
      >
        Add
      </button>
    </div>

    <Tasklist
      tasks={tasks}
      onDelete={deleteTask}
      onToggleComplete={onToggleComplete}
    />
  </div>
</main>


      <Hero />
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
