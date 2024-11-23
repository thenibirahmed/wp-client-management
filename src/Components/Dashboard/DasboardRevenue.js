import React from "react";
import { ArrowRight02Icon } from "../../utils/icons";
import Graph from "./LineGraph";

const DasboardRevenue = ({ chartData }) => {
  const chartDataList = chartData?.map((item) => ({
    month: item?.month,
    revenue: Number(item?.revenue),
    expense: chartData?.expense || 0,
  }));

  return (
    <div className=" border  border-borderColor rounded-[8px] lg:p-[32px] p-5">
      <div className="flex justify-between">
        <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
          Revenue
        </h1>
        {/* <button className="flex items-center gap-2">
          <h3 className="font-metropolis uppercase text-sm font-semibold text-customBlue">
            See Report
          </h3>
          <ArrowRight02Icon className="text-customBlue" />
        </button> */}
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
        <Graph myData={chartDataList} />
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
