import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md border-b border-gray-300 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        >
          <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
            Task Tracker
          </h1>
        </div>

        {/* Middle nav buttons (only on dashboard) */}
        {isDashboard && (
          <div className="hidden md:flex gap-6 text-gray-700 font-medium">
            <button className="hover:text-blue-600 transition-colors">
              Features
            </button>
            <button className="hover:text-blue-600 transition-colors">
              Pricing
            </button>
            <button className="hover:text-blue-600 transition-colors">
              About
            </button>
          </div>
        )}

        {/* Right button */}
        <div>
          {isDashboard ? (
            <button
              onClick={() => navigate("/")}
              className="text-white px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              Home
            </button>
          ) : (
            <button
              onClick={() => navigate("/dashboard")}
              className="text-white px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-colors"
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
