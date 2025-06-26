import React from "react";

function Footer() {
  return (
    <footer className="py-4 text-center text-white bg-gray-500 border-t border-gray-200">
      <p>@{new Date().getFullYear()} TaskTracker. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
