import React from "react";

export default function RecentActivity() {
  return (
    <div className="mt-8 bg-white rounded-xl shadow p-6 w-full max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Recent Activity</h2>
      <p className="text-gray-500 text-sm">
        Latest updates from your workspace
      </p>
      <div className="mt-4 text-gray-400 italic">No recent activity.</div>
    </div>
  );
}
