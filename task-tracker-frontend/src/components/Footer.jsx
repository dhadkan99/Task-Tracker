import React from "react";

function Footer() {
  return (
    <footer className="py-4 text-center text-black border-b border-gray-300 shadow-sm backdrop-blur-md bg-white/30">
      <p>@{new Date().getFullYear()} TaskTracker. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
