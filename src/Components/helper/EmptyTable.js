import React from "react";

const EmptyTable = ({ setOpen, title, subtitle, btnText, Icon }) => {
  return (
    <>
      <div className=" min-h-[400px] max-h-[380px] border border-borderColor flex justify-center items-center rounded-lg">
        <div className="text-center">
          <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
            {title}
          </h1>
          <p className="text-textColor2 text-sm font-normal font-metropolis  mt-2">
            {subtitle}
          </p>
          <button
            onClick={() => setOpen(true)}
            className="border  mt-6  border-customBlue text-xs text-customBlue font-metropolis font-medium px-5 py-[10px]  rounded-[5px]"
          >
            {btnText}
          </button>
        </div>
      </div>
    </>
  );
};

export default EmptyTable;
