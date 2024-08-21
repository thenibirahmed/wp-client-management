import React from "react";

const Separator = ({ className }) => {
  return (
    <>
      {" "}
      <div
        aria-hidden="true"
        className={` h-[1px] w-full bg-separatorColor ${className} `}
      />
    </>
  );
};

export default Separator;
