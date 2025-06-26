import React from "react";

const Button = ({ type, onClick }) => {
  const baseClasses =
    "px-4 py-2 text-gray-700 bg-white rounded shadow transition-colors duration-200";
  const hoverClasses = {
    add: "hover:bg-green-500 hover:text-white",
    delete: "hover:bg-red-500 hover:text-white",
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className={`${baseClasses} ${hoverClasses[type] || hoverClasses.add}`}
        onClick={onClick}
        type="button"
      >
        {type === "delete" ? "Delete Button" : "Add Button"}
      </button>
    </div>
  );
};

export default Button;
