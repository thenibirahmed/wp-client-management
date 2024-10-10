import React from "react";

const Errors = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-300px)] p-4  rounded-md">
      <p className="text-center text-rose-600 font-metropolis font-semibold text-xl">
        {message ? message : "Something went wrong"}
      </p>
    </div>
  );
};

export default Errors;
