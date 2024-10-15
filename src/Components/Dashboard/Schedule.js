import React from "react";
import Calendar from "./HorizontaCalendar";
import { ArrowRight02Icon } from "../../utils/icons";

const Schedule = () => {
  return (
    <div className="border  border-borderColor rounded-[8px] p-[24px]">
      <div className="flex justify-between">
        <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
          Upcoming Schedule
        </h1>
        <button className="flex items-center gap-2">
          <h3 className="font-metropolis uppercase text-sm font-semibold text-customBlue">
            View all
          </h3>
          <ArrowRight02Icon className="text-customBlue" />
        </button>
      </div>

      <Calendar />
    </div>
  );
};

export default Schedule;
