import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";

const bgUrl =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80";

function Landingpage() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex flex-col relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <Header />
      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center relative z-10 pt-32 pb-12 px-4">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Master Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Tasks
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
              Transform your productivity with our intelligent task tracking
              system. Visualize progress, manage deadlines, and achieve your
              goals effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-7 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-12 w-full">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10K+</div>
            <div className="text-gray-300 text-sm mt-1">Tasks Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="text-gray-300 text-sm mt-1">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">99.9%</div>
            <div className="text-gray-300 text-sm mt-1">Uptime</div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}

export default Landingpage;
