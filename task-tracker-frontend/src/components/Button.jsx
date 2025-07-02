import React from "react";

function Button({ type, onClick, className, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-white rounded-md transition-all duration-150 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
