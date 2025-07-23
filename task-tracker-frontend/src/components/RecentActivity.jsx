import React, { useEffect, useState } from "react";
import { fetchTasks } from "../api/task";

export default function RecentActivity() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  // Sort by creation date descending and take the 5 most recent
  const recentTasks = Array.isArray(tasks)
    ? tasks
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    : [];

  return (
    <div className="p-6 mx-auto mt-8 w-full max-w-7xl bg-white rounded-xl shadow">
      <h2 className="mb-2 text-xl font-bold text-gray-800">Recent Activity</h2>
      <p className="mb-2 text-sm text-gray-500">Latest tasks (task & date)</p>
      {loading ? (
        <div className="italic text-gray-400">Loading...</div>
      ) : error ? (
        <div className="italic text-red-500">{error}</div>
      ) : recentTasks.length === 0 ? (
        <div className="mt-4 italic text-gray-400">No recent activity.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {recentTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center py-2"
            >
              <span className="text-gray-900">{task.task}</span>
              <span className="text-xs text-gray-500">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
