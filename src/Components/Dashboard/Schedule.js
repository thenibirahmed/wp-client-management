import React, { useState } from "react";
import Calendar from "./HorizontaCalendar";
import { ArrowRight02Icon } from "../../utils/icons";
import useCheckedHandler from "../../utils/useCheckedItem";

const Schedule = ({ schedules }) => {
  const [selectedClient, setSelectedClient] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const { checkedAllClient, checkedSingleClient } = useCheckedHandler(
    selectedClient,
    setIsAllSelected,
    setSelectedClient
  );

  return (
    <div className="border  border-borderColor rounded-[8px] lg:p-[24px] p-4">
      <div className="flex xl:flex-row flex-col sm:gap-0 gap-2 justify-between">
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

      <div className="space-y-[16px] mt-7 ">
        {schedules?.map((item) => {
          const isChecked = selectedClient.some(
            (client) => client?.id === item?.id
          );
          return (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  checked={isChecked}
                  onChange={(e) => checkedSingleClient(e.target.checked, item)}
                  type="checkbox"
                  className="border-[1px] border-borderColor2 w-[16px] h-[16px] rounded-[4px]"
                />
                <div>
                  <p
                    className={`text-xs font-semibold font-metropolis   ${
                      isChecked ? "text-textColor" : "text-iconColor2"
                    }`}
                  >
                    {item.scheduled_at}
                  </p>
                  <span
                    className={`text-xs font-normal ${
                      isChecked ? "text-textColor" : "text-iconColor2"
                    } font-metropolis `}
                  >
                    {item.date}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h3
                  className={`text-xs font-semibold font-metropolis  ${
                    isChecked ? "text-textColor" : "text-iconColor2"
                  }`}
                >
                  {item.topic}
                </h3>
                <h4
                  className={`text-xs font-normal font-metropolis ${
                    isChecked ? "text-textColor" : "text-iconColor2"
                  }`}
                >
                  {item.description}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
