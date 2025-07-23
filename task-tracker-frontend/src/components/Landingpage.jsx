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
      className="flex overflow-hidden relative flex-col min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-black/60" />
      </div>

      <Header />
      {/* Hero Section */}
      <main className="flex relative z-10 flex-col flex-1 justify-center items-center px-4 pt-32 pb-12">
        <div className="flex flex-col gap-10 items-center w-full max-w-6xl md:flex-row md:gap-16">
          <div className="flex-1 text-white">
            <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              Master Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                Tasks
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-gray-200 md:text-xl">
              Transform your productivity with our intelligent task tracking
              system. Visualize progress, manage deadlines, and achieve your
              goals effortlessly.
            </p>
            <div className="flex flex-col gap-4 mb-8 sm:flex-row">
              <button
                onClick={() => navigate("/login")}
                className="px-7 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg transition-colors hover:from-purple-600 hover:to-indigo-600"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="flex flex-col gap-8 justify-center items-center mt-12 w-full sm:flex-row">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10K+</div>
            <div className="mt-1 text-sm text-gray-300">Tasks Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="mt-1 text-sm text-gray-300">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">99.9%</div>
            <div className="mt-1 text-sm text-gray-300">Uptime</div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}

export default Landingpage;
