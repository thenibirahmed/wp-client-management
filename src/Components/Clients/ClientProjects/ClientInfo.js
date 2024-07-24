import React from "react";
import { Delete03Icon } from "../../../utils/icons";

const ClientInfo = () => {
  return (
    <div className="flex justify-between items-center   pb-5 border-b border-b-borderColor">
      <div className="flex  gap-4">
        <div>
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div>
          <h1 className="font-metropolis font-semibold  text-textColor text-3xl ">
            Easin
          </h1>
          <span className="text-xs  text-textColor2 font-metropolis font-normal ">
            ENGINEER
          </span>
        </div>
      </div>
      <div className="flex gap-6">
        <a href="">
          <Delete03Icon className="text-textColor2" />
        </a>{" "}
        <a href="">
          <Delete03Icon className="text-textColor2" />
        </a>{" "}
        <a href="">
          <Delete03Icon className="text-textColor2" />
        </a>{" "}
        <a href="">
          <Delete03Icon className="text-textColor2" />
        </a>
      </div>
    </div>
  );
};

export default ClientInfo;
