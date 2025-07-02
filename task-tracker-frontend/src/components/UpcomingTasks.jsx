import React from "react";

export default function UpcomingTasks({ tasks }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
          Upcoming Tasks
        </h2>
      </div>
      <p className="text-gray-500 text-sm">
        {tasks.length} active tasks, 0 completed
      </p>
    </div>
  );
}
