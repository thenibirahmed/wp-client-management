import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import DateRangePicker from "../DateRangePicker";
import { OvierViewItem } from "../helper/OverViewItem";
import { ArrowUpRight01Icon } from "../../utils/icons";

const DashBoardOverView = ({
  dateRange,
  setDateRange,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}) => {
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (startDate && endDate && endDate !== "Invalid Date") {
      const dateStart = dayjs(startDate).format("YYYY-MM-DD");
      const dateEnd = dayjs(endDate).format("YYYY-MM-DD");
      setDateFrom(dateStart);
      setDateTo(dateEnd);
    }
  }, [dateRange]);

  return (
    <React.Fragment>
      <div className="flex xl:flex-row flex-col justify-between xl:items-center xl:gap-0 gap-3 ">
        <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
          Overview
        </h1>

        <div className="sm:w-fit flex sm:flex-row flex-col  items-center gap-6 sm:justify-start justify-center w-full">
          <span className="text-sm font-semibold text-textColor3">
            Timeframe
          </span>

          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        </div>
      </div>

      <div className="flex   w-full  xl:flex-row flex-col  xl:justify-between  items-center border border-borderColor rounded-lg">
        <>
          <OvierViewItem
            title="Total Invoice"
            amount={450}
            invoice="1 Invoice"
            icons
            Icon={ArrowUpRight01Icon}
            dashboard
          />
          <OvierViewItem
            title="Total Revenue"
            amount={450}
            invoice="1 Invoice"
            icons
            Icon={ArrowUpRight01Icon}
            dashboard
          />
          <OvierViewItem
            title="Total Due"
            amount={450}
            invoice="1 Invoice"
            icons
            Icon={ArrowUpRight01Icon}
            dashboard
          />
          <OvierViewItem
            title="Total Expence"
            amount={450}
            invoice="1 Invoice"
            icons
            Icon={ArrowUpRight01Icon}
            dashboard
            expense
          />
          <OvierViewItem
            title="Total Clients"
            amount={450}
            invoice="1 Invoice"
            icons
            Icon={ArrowUpRight01Icon}
            dashboard
            clients
          />
        </>
      </div>
    </React.Fragment>
  );
};

export default DashBoardOverView;
