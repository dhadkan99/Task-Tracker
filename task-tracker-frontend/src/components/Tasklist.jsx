import React from "react";

function Tasklist({ tasks, onDelete, onToggleComplete, onUpdateTask }) {
  if (!Array.isArray(tasks)) {
    return (
      <p className="text-red-500">Something went wrong. Tasks are invalid.</p>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.length === 0 ? (
        <p className="text-black">No tasks yet. Add one above.</p>
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
                  className="w-5 h-5 text-blue-600 rounded focus:ring-lime-500"
                  aria-label={`Mark ${task.task} as complete`}
                />
                <span
                  className={`ml-3 ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {task.task}
                </span>
                {task.startDate && task.endDate && (
                  <span className="ml-4 text-xs text-gray-500">
                    {new Date(task.startDate).toLocaleDateString()} -{" "}
                    {new Date(task.endDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="flex gap-4 justify-end ml-10">
                {!task.completed && (
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateTask(
                        task.id,
                        task.task,
                        task.startDate,
                        task.endDate
                      )
                    }
                    className="text-green-500 hover:text-green-700"
                    title="Edit task"
                  >
                    Edit
                  </button>
                )}
                {/* {!task.completed && (
                  <button
                    type="button"
                    onClick={() => onDelete(task.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete task"
                  >
                    Delete
                  </button>
                )} */}
                {task.completed && (
                  <span className="text-sm font-medium text-green-600">
                    Completed - Removing soon...
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasklist;
