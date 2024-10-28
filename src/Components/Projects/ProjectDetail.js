import React, { useEffect } from "react";

import { useStoreContext } from "../../store/ContextApiStore";
import ProjectInfo from "./ProjectInfo";
import ProjectOverView from "./ProjectOverView";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import Tab from "../helper/Tabs";
import AddNewInvoice from "../helper/invoices/addNewInvoice/AddNewInvoice";
import useHashRouting from "../../utils/useHashRouting";
import Skeleton from "../Skeleton";
import Errors from "../Errors";
import ProjectTaskDetails from "./ProjectTask/ProjectTaskDetails";
import { useClientOverViewRefetch } from "../../hooks/useRefetch";
import {
  useFetchSelectCurrency,
  useFetchSingleProjectOverView,
} from "../../hooks/useQuery";

const extractProjectId = (url) => {
  const match = url.match(/projects\/#\/(\d+)/);
  return match ? match[1] : null;
};

const ProjectDetail = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const {
    createInvoice,
    updateInvoice,
    openTaskDesc,
    setCreateInvoice,
    setUpdateInvoice,
    setOpenTaskDesc,
    dateRange,
    setDateRange,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    setSelectStatus,
    setSelectPriority,
    setSearchText,
    selectCurrency,
    setSelectCurrency,
    isFetching,
  } = useStoreContext();

  const projectId = extractProjectId(currentPath);

  const {
    isLoading,
    data: singleProjectOverView,
    error,
    refetch,
  } = useFetchSingleProjectOverView(
    projectId,
    dateFrom,
    dateTo,
    selectCurrency?.code,
    onError
  );

  useClientOverViewRefetch(
    dateFrom,
    dateTo,
    selectCurrency,
    refetch,
    isFetching,
    true,
    projectId
  );

  const {
    isLoading: isLoadingSelectCurrency,
    data: currencyLists,
    error: selecturrencyErr,
  } = useFetchSelectCurrency(onError);

  function onError(err) {
    console.log(err);
  }

  useEffect(() => {
    if (createInvoice || updateInvoice) {
      setOpenTaskDesc(false);
    }

    if (openTaskDesc) {
      setCreateInvoice(false);
      setUpdateInvoice(false);
    }
  }, [createInvoice, updateInvoice, openTaskDesc]);

  useEffect(() => {
    if (currencyLists?.currency.length > 0) {
      const usdCurrency = currencyLists?.currency?.find(
        (item) => item.code === "USD"
      );

      setSelectCurrency(usdCurrency);
    } else {
      setSelectCurrency({ name: " -No Currency- ", id: null });
    }
  }, [currencyLists]);

  if (isLoading || isLoadingSelectCurrency) return <Skeleton />;

  if (error || selecturrencyErr) {
    return (
      <Errors
        message={
          error?.response?.data?.errors?.id[0] ||
          `Failed To Fetch Project Overview Data for clientId ${projectId}`
        }
      />
    );
  }

  return (
    <React.Fragment>
      {!createInvoice && !updateInvoice && !openTaskDesc ? (
        <React.Fragment>
          <ProjectInfo projectHeader={singleProjectOverView?.header} />
          <ProjectOverView
            dateRange={dateRange}
            setDateRange={setDateRange}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
            projectDetails={true}
            topBar={singleProjectOverView?.topBar}
            setSearchText={setSearchText}
            setSelectStatus={setSelectStatus}
            setSelectPriority={setSelectPriority}
            selectCurrency={selectCurrency}
            setSelectCurrency={setSelectCurrency}
          />
          <div className="space-y-6">
            <Tab task={true} tabCount={singleProjectOverView?.tabs} />
            <React.Fragment>
              <ProjectDetailsLayout projectId={projectId} />
            </React.Fragment>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {openTaskDesc ? (
            <ProjectTaskDetails />
          ) : (
            <AddNewInvoice
              update={updateInvoice}
              type="project"
              clientId={projectId}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProjectDetail;
