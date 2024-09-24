import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar02Icon } from "../utils/icons";

const DateRangePicker = () => {
  const datePickerRef = useRef(null);
  const [dateRange, setDateRange] = useState([
    new Date(),
    dayjs().add(1, "day").toDate(),
  ]);
  const [startDate, endDate] = dateRange;
  const [showDatePicker, setShowDatePicker] = useState(false); // Controls visibility

  const handleDateRangeChange = (update) => {
    setDateRange(update); // Update the date range
  };

  const formatDisplayDate = (date) =>
    date ? dayjs(date).format("D MMM, YYYY") : "";

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker); // Toggle date picker visibility on icon click
  };

  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      setShowDatePicker(false); // Close the date picker when clicking outside
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false); // Close the date picker
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  return (
    <div
      ref={datePickerRef}
      className="relative flex justify-between w-80 items-center border-[1px] border-borderColor px-4 py-[8px] rounded-[5px]"
    >
      <div className="flex items-center text-[14px] font-metropolis font-normal  text-textColor2">
        {/* Display formatted date range */}
        <span className="block w-60 text-center">
          {formatDisplayDate(startDate)} - {formatDisplayDate(endDate)}
        </span>
      </div>

      <button onClick={toggleDatePicker} className="focus:outline-none">
        <Calendar02Icon />
      </button>

      {/* Conditionally render the date picker popup */}
      {showDatePicker && (
        <div className="absolute top-12 left-0 bg-white p-4 border border-gray-300 rounded-lg shadow-lg z-10">
          {/* Date Range Picker */}
          <DatePicker
            selected={startDate}
            onChange={handleDateRangeChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
