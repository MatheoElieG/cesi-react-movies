import React from "react";

export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  return (
    <button
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:cursor-not-allowed disabled:hover:bg-zinc-700/10 disabled:bg-zinc-700/10"
      {...props}
    >
      {props.children}
    </button>
  );
};
