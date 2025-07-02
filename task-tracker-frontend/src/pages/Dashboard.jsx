// import React, { useState } from "react";
// import Tasklist from "../components/Tasklist";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcomingTasks from "../components/UpcomingTasks";
import TaskProgress from "../components/WeeklyProgressChart";
import RecentActivity from "../components/RecentActivity";
import Tasks from "../components/Tasks";

const tasks = [
  {
    title: "hello",
    desc: "hello",
    tag: "hello",
    time: "hllo,2:22 AM",
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      <Header />

      <main className="flex-grow px-8 py-6 w-full max-w-6xl mx-auto pt-16 pb-8">
        {/* Welcome & Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
              Welcome back! <span>👋</span>
            </h1>
            <p className="text-gray-500 mt-1">
              Here's what's happening with your tasks today.
            </p>
          </div>
        </div>
        <Tasks tasks={tasks} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          <TaskProgress />
          <UpcomingTasks tasks={tasks} />
        </div>

        <div className="mt-12">
          <RecentActivity />
        </div>
      </main>
      <Footer />
    </div>
  );
}
