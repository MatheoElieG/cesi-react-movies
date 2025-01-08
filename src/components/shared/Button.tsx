import React from "react";

export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  return (
    <button
      className="bg-cyan-500 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded-md text-white"
      {...props}
    >
      {props.children}
    </button>
  );
};
