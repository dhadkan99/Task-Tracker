import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-300 border-solid shadow-sm backdrop-blur-md bg-white/30">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div
          className="flex gap-2 items-center transition-transform cursor-pointer hover:scale-105"
          onClick={() => navigate("/")}
        >
          <h1 className="flex gap-2 items-center text-3xl font-bold text-purple-700">
            Task Tracker
          </h1>
        </div>

        {/* Middle nav buttons (only on dashboard) */}
        {isDashboard && (
          <div className="hidden gap-6 font-medium text-gray-700 md:flex">
            <button className="transition-colors hover:text-blue-600">
              Features
            </button>
            <button className="transition-colors hover:text-blue-600">
              Pricing
            </button>
            <button className="transition-colors hover:text-blue-600">
              About
            </button>
          </div>
        )}

        {/* Right button */}
        <div>
          {isDashboard ? (
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-colors hover:from-blue-600 hover:to-purple-700"
            >
              Home
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-colors hover:from-blue-600 hover:to-purple-700"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
