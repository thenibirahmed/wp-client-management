import React from "react";
import {
  CallIcon,
  Delete03Icon,
  Location01Icon,
  Mail02Icon,
  PencilEdit02Icon,
} from "../../utils/icons";

import Skeleton from "../Skeleton";

const ClientInfo = ({ profile }) => {
  return (
    <div className="flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between sm:items-center   pb-5 border-b border-b-borderColor">
      <div className="flex items-center  gap-4">
        <div>
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div>
          <h1 className="font-metropolis font-semibold  text-textColor text-3xl ">
            {profile?.name}
          </h1>
          <span className="text-xs  text-textColor2 font-metropolis font-normal ">
            {profile?.designation}
          </span>
        </div>
      </div>
      <div className="flex gap-6">
        <a href="">
          <CallIcon className="text-textColor2" />
        </a>{" "}
        <a href="">
          <Mail02Icon className="text-textColor2" />
        </a>{" "}
        <a href="">
          <Location01Icon className="text-textColor2" />
        </a>{" "}
        <a href="">
          <PencilEdit02Icon className="text-textColor2" />
        </a>
      </div>
    </div>
  );
};

export default ClientInfo;
