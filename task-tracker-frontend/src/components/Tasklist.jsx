import React from "react";

function Tasklist({ tasks, onDelete, onToggleComplete }) {
  return (
    <div className="space-y-2">
      {tasks.length === 0 ? (
        <p className="text-black">No tasks yet. Add one above</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center py-3"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  className="w-5 h-5 text-blue-50 rounded focus:ring-lime-50"
                />
                <span
                  className={`ml-3 ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onDelete(task.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
// onClick={() => onDelete(task.id)}
export default Tasklist;
