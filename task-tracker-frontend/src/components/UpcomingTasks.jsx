import React from "react";

function UpcomingTasks({ Tasks }) {
  return (
    <div className="p-6 mx-auto w-full max-w-7xl bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="flex gap-2 items-center text-xl font-bold text-purple-700">
          Upcoming Tasks
        </h2>
      </div>
      <p className="text-sm text-gray-400">active tasks, 0 completed</p>
      {Tasks}
    </div>
  );
}
export default UpcomingTasks;
