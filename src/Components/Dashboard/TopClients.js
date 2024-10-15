import React from "react";
import PieChart from "./PieChart";
import { ArrowRight02Icon } from "../../utils/icons";
const dummyPieData = [
  { category: "Category 1", value: 30 },
  { category: "Category 2", value: 20 },
  { category: "Category 3", value: 15 },
  { category: "Category 4", value: 25 },
  { category: "Category 5", value: 10 },
];

const dummyData = [
  {
    name: "Product A",
    amount: 5000,
    percentage: 25,
  },
  {
    name: "Product B",
    amount: 3000,
    percentage: 15,
  },
  {
    name: "Product C",
    amount: 7000,
    percentage: 35,
  },
  {
    name: "Product D",
    amount: 4000,
    percentage: 20,
  },
  {
    name: "Product E",
    amount: 1000,
    percentage: 5,
  },
];

const TopClients = () => {
  return (
    <div className=" border  border-borderColor rounded-[8px] p-[24px] space-y-[20px]">
      <div className="flex justify-between">
        <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
          Project List
        </h1>
        <button className="flex items-center gap-2">
          <span className="font-metropolis uppercase text-sm font-semibold text-customBlue">
            View all
          </span>
          <ArrowRight02Icon className="text-customBlue" />
        </button>
      </div>

      <PieChart myData={dummyPieData} />

      <div className="pt-5 font-metropolis ">
        <div className="grid grid-cols-3 pb-3  border-b-[1px] border-b-borderColor ">
          <div className="uppercase text-xs font-semibold font-metropolis text-textColor2">
            TOP Clients
          </div>
          <div className="uppercase text-xs font-semibold font-metropolis text-textColor2">
            Earning
          </div>
          <div></div>
        </div>
        <div className="pt-4 space-y-[16px]">
          {dummyData.map((item) => (
            <div className="grid grid-cols-3 ">
              <div className="text-sm font-normal text-textColor2">
                {item.name}
              </div>
              <div className="text-sm   font-semibold text-textColor3">
                ${item.amount}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm flex font-normal  text-textColor2">
                  <span> {item.percentage}</span> <span>%</span>
                </div>
                <ProgressBars percentage={item.percentage} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopClients;

const ProgressBars = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
        style={{ width: percentage }}
      />
    </div>
  );
};
