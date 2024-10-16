import React from "react";
import { ArrowRight02Icon } from "../../utils/icons";
import Graph from "./LineGraph";
const dummyData = [
  { month: "Jan", revenue: 1200, expense: 1000 },
  { month: "Feb", revenue: 1500, expense: 1300 },
  { month: "Mar", revenue: 1000, expense: 900 },
  { month: "Apr", revenue: 2200, expense: 1800 },
  { month: "May", revenue: 1300, expense: 1100 },
  { month: "Jun", revenue: 1800, expense: 1500 },
  { month: "Jul", revenue: 2000, expense: 1700 },
  { month: "Aug", revenue: 1900, expense: 1600 },
  { month: "Sep", revenue: 2100, expense: 1800 },
  { month: "Oct", revenue: 2500, expense: 2000 },
  { month: "Nov", revenue: 3000, expense: 2400 },
  { month: "Dec", revenue: 3200, expense: 2600 },
];

const DasboardRevenue = () => {
  return (
    <div className=" border  border-borderColor rounded-[8px] lg:p-[32px] p-5">
      <div className="flex justify-between">
        <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
          Revenue
        </h1>
        <button className="flex items-center gap-2">
          <h3 className="font-metropolis uppercase text-sm font-semibold text-customBlue">
            See Report
          </h3>
          <ArrowRight02Icon className="text-customBlue" />
        </button>
      </div>

      <div className="flex items-center gap-[20px]  mt-3">
        <div className="flex items-center gap-[4px]">
          <BlueCircle />
          <span className="text-xs font-normal font-metropolis text-textColor2">
            Revenue
          </span>
        </div>
        <div className="flex items-center gap-[4px]">
          <HashCircle />
          <span className="text-xs font-normal font-metropolis text-textColor2">
            Expense
          </span>
        </div>
      </div>
      <div className="mt-7 w-full">
        <Graph myData={dummyData} />
      </div>
    </div>
  );
};

export default DasboardRevenue;
const BlueCircle = () => {
  return <div className="w-[10px] h-[10px] rounded-full bg-customBlue"></div>;
};
const HashCircle = () => {
  return <div className="w-[10px] h-[10px] rounded-full bg-customBg7"></div>;
};
