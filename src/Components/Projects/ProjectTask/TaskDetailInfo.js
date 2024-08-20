import React from "react";
import useHashRouting from "../../../utils/useHashRouting";
import RedCirlcle from "../../helper/RedCirlcle";

import { HourglassIcon, MoneyBag02Icon } from "../../../utils/icons";

const TaskDetailInfo = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");

  return (
    <div className="flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between items-center   pb-5 border-b border-b-borderColor">
      <div className="space-y-2">
        <h1 className="font-metropolis font-semibold  text-textColor text-3xl ">
          The Sunflower Garden
        </h1>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-metropolis text-textColor  text-sm font-semibold">
              Owner :{" "}
            </span>
            <span className="font-metropolis text-2  text-sm font-normal">
              Katona Beatrix
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-metropolis text-textColor  text-sm font-semibold">
              Assignee To:{" "}
            </span>
            <span className="font-metropolis text-2  text-sm font-normal">
              Katona Beatrix
            </span>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row flex-wrap items-center gap-4">
        <div className="flex items-center  gap-2">
          <span>
            <RedCirlcle />
          </span>
          <span className="font-metropolis text-textColor2 text-sm font-normal">
            High
          </span>
        </div>
        <div className="py-[2px] bg-customBg4 text-purple px-[10px] font-metropolis font-medium text-xs rounded-[5px]">
          In progress
        </div>

        <div className="flex gap-4">
          <a href="">
            {" "}
            <MoneyBag02Icon className="text-textColor2" />
          </a>
          <a href="">
            {" "}
            <HourglassIcon className="text-textColor2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailInfo;
