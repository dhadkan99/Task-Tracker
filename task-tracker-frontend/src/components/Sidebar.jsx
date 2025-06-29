import React from "react";

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 z-20 w-40 h-full bg-gray-100 border-r border-gray-200 shadow-lg">
      <ul className="flex flex-col gap-5 p-7 pt-20 text-lg">
        <li className="px-4 py-2 rounded transition cursor-pointer hover:bg-gray-200">
          Home
        </li>
        <li className="px-4 py-2 rounded transition cursor-pointer hover:bg-gray-200">
          Setting
        </li>
        <li className="px-4 py-2 rounded transition cursor-pointer hover:bg-red-600 hover:text-white">
          Log out
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
