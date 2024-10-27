import React, { useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import DashBoardOverView from "./DashBoardOverView";
import DasboardRevenue from "./DasboardRevenue";
import ProjectList from "./ProjectList";
import Schedule from "./Schedule";
import TopClients from "./TopClients";
import Skeleton from "../Skeleton";
import Errors from "../Errors";
import {
  useFetchDashboardOverView,
  useFetchDashboardProjectLists,
  useFetchDashboardReports,
  useFetchDashboardTopClients,
  useFetchDashboardUpcomingShedule,
} from "../../hooks/useQuery";

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
    isLoading: reportLoader,
    data: report,
    error: reportErr,
  } = useFetchDashboardReports(onError);

  const {
    isLoading: clientLoader,
    data: client,
    error: clientErr,
  } = useFetchDashboardTopClients(onError);

  const loaders =
    isLoading ||
    projectLoader ||
    scheduleLoader ||
    clientLoader ||
    reportLoader;

  if (loaders) return <Skeleton />;

  function onError(err) {
    console.log(err);
    toast.error(err?.reponse?.data?.messge || "Internal server error");
  }

  const errors = error || clientErr || projectErr || reportErr || scheduleErr;

  if (errors)
    return (
      <Errors
        message={
          error?.response?.data?.errors?.id[0] || "internal server error"
        }
      />
    );

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
            <DasboardRevenue chartData={report?.chartData} />
            <ProjectList projects={project?.projects} />
          </div>
          <div className="2xl:w-[28%] xl:w-[30%] lg:w-[35%] w-full space-y-[20px]">
            <Schedule schedules={schedules?.schedules} />
            <TopClients clients={client?.clients} />
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Dashboard;
