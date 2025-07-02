import React from "react";

function Footer() {
  return (
    <footer className="py-4 text-center text-black bg-white/30 backdrop-blur-md border-b border-gray-300 shadow-sm">
      <p>@{new Date().getFullYear()} TaskTracker. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
