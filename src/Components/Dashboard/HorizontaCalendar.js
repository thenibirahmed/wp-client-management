import React, { useState } from "react";
import dayjs from "dayjs"; // Using Day.js to manage dates
import { ArrowLeft01Icon, ArrowRight01Icon } from "../../utils/icons";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // Start from today's date
  const today = dayjs(); // Store the current date

  // Function to move to the next week (add 7 days)
  const handleNextWeek = () => {
    setCurrentDate(currentDate.add(7, "day"));
  };

  // Function to move to the previous week (subtract 7 days)
  const handlePreviousWeek = () => {
    setCurrentDate(currentDate.subtract(7, "day"));
  };

  // Get the days of the week starting from the current date
  const getWeekDates = () => {
    let week = [];
    for (let i = 0; i < 7; i++) {
      week.push(currentDate.add(i, "day"));
    }
    return week;
  };

  // Render day names (Sun, Mon, etc.) and dates
  const weekDates = getWeekDates();

  // Get the current month and year for display
  const currentMonthYear = currentDate.format("MMMM YYYY");

  return (
    <div className="pt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-textColor3 font-metropolis">
          {currentMonthYear}
        </h2>
        <div className="space-x-3">
          <button onClick={handlePreviousWeek}>
            <ArrowLeft01Icon className="text-textColor2" />
          </button>
          <button onClick={handleNextWeek}>
            <ArrowRight01Icon className="text-textColor2" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDates.map((date, index) => (
          <div key={index} className="text-center">
            <span className="uppercase text-xs font-semibold text-textColor2 font-metropolis">
              {date.format("ddd")}
            </span>
          </div>
        ))}
      </div>

      {/* Display Corresponding Dates */}
      <div className="grid grid-cols-7 gap-4 mt-2">
        {weekDates.map((date, index) => (
          <div key={index} className="text-center">
            <span
              className={`uppercase text-xs font-semibold font-metropolis ${
                date.isSame(today, "day")
                  ? "text-customBlue bg-customBg6 w-[36px] h-[36px] rounded-full"
                  : "text-textColor2"
              }`}
            >
              {date.format("DD")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
