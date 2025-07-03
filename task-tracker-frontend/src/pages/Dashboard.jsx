// import React, { useState } from "react";
// import Tasklist from "../components/Tasklist";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcomingTasks from "../components/UpcomingTasks";
import TaskProgress from "../components/WeeklyProgressChart";
import RecentActivity from "../components/RecentActivity";
import Tasks from "../components/Tasks";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      <Header />

      <main className="flex-grow px-8 py-6 pt-16 pb-8 mx-auto w-full max-w-6xl">
        {/* Welcome & Controls */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="flex gap-2 items-center text-3xl font-bold text-purple-700">
              Welcome ! <span>👋</span>
            </h1>
            <p className="mt-1 text-gray-500">
              Here's what's happening with your tasks today.
            </p>
          </div>
        </div>
        <Tasks />

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 mt-12 lg:grid-cols-3">
          <TaskProgress />
          <UpcomingTasks />
        </div>

        <div className="mt-12">
          <RecentActivity />
        </div>
      </main>
      <Footer />
    </div>
  );
}
