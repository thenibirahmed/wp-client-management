import React from "react";

const ClearButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border-[1px] sm:w-fit w-72 rounded-[5px] text-textColor2  border-borderColor px-4 py-[9px] text-[14px] font-metropolis font-medium"
    >
      Clear Filter
    </button>
  );
};

export default ClearButton;
