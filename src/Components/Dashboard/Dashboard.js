import React, { useState } from "react";
import DashBoardOverView from "./DashBoardOverView";
import dayjs from "dayjs";
import DasboardRevenue from "./DasboardRevenue";
import ProjectList from "./ProjectList";
import Schedule from "./Schedule";
import TopClients from "./TopClients";
import {
  useFetchDashboardOverView,
  useFetchDashboardProjectLists,
  useFetchDashboardReport,
  useFetchDashboardTopClients,
  useFetchDashboardUpcomingShedule,
} from "../../hooks/useQuery";
import toast from "react-hot-toast";
import Skeleton from "../Skeleton";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(3, "month").toDate(),
    new Date(),
  ]);

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const {
    isLoading,
    data: dashboard,
    error,
    refetch,
  } = useFetchDashboardOverView(onError);

  const {
    isLoading: scheduleLoader,
    data: schedules,
    error: scheduleErr,
  } = useFetchDashboardUpcomingShedule(onError);

  const {
    isLoading: projectLoader,
    data: project,
    error: projectErr,
  } = useFetchDashboardProjectLists(onError);

  const {
    isLoading: clientLoader,
    data: client,
    error: clientErr,
  } = useFetchDashboardTopClients(onError);

  if (isLoading || projectLoader) return <Skeleton />;

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetchClientOverView data");
  }

  return (
    <React.Fragment>
      <DashBoardOverView
        dateRange={dateRange}
        setDateRange={setDateRange}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        topBar={dashboard?.topBar}
      />{" "}
      <React.Fragment>
        <div className="flex lg:flex-row flex-col gap-4">
          <div className=" xl:w-[70%] lg:w-[65%] w-full space-y-[20px]">
            <DasboardRevenue />
            <ProjectList projects={project?.projects} />
          </div>
          <div className="2xl:w-[28%] xl:w-[30%] lg:w-[35%] w-full space-y-[20px]">
            <Schedule />
            <TopClients clients={client?.clients} />
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Dashboard;
