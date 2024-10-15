import React, { useState } from "react";
import DashBoardOverView from "./DashBoardOverView";
import dayjs from "dayjs";
import DasboardRevenue from "./DasboardRevenue";
import ProjectList from "./ProjectList";
import Schedule from "./Schedule";
import TopClients from "./TopClients";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(3, "month").toDate(),
    new Date(),
  ]);

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  return (
    <React.Fragment>
      <DashBoardOverView
        dateRange={dateRange}
        setDateRange={setDateRange}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
      />{" "}
      <React.Fragment>
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="flex-1 space-y-[20px]">
            <DasboardRevenue />
            <ProjectList />
          </div>
          <div className="lg:w-[400px] w-full space-y-[20px]">
            <Schedule />
            <TopClients />
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Dashboard;
