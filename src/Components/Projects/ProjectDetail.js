import React from "react";

import { useStoreContext } from "../../store/ContextApiStore";
import ProjectInfo from "./ProjectInfo";
import ProjectOverView from "./ProjectOverView";

import ProjectDetailsLayout from "./ProjectDetailsLayout";
import Tab from "../helper/Tabs";
import AddNewInvoice from "../helper/invoices/addNewInvoice/AddNewInvoice";
import useHashRouting from "../../utils/useHashRouting";
import { useFetchSingleProjectOverView } from "../../hooks/useQuery";
import Skeleton from "../Skeleton";
import toast from "react-hot-toast";
import Errors from "../Errors";

const ProjectDetail = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const { createInvoice } = useStoreContext();

  const {
    isLoading,
    data: singleProjectOverView,
    error,
  } = useFetchSingleProjectOverView(pathArray[1], onError);

  console.log("singleClientOverView", singleProjectOverView);

  function onError(err) {
    console.log(err);
  }

  if (isLoading) return <Skeleton />;

  if (error) {
    return (
      <Errors
        message={
          error?.response?.data?.errors?.id[0] ||
          `Failed To Fetch Project Overview Data for clientId ${pathArray[1]}`
        }
      />
    );
  }

  return (
    <React.Fragment>
      {!createInvoice ? (
        <React.Fragment>
          <ProjectInfo projectHeader={singleProjectOverView.header} />
          <ProjectOverView
            projectOverView={singleProjectOverView.topBar}
            projectDetails
          />
          <div className="space-y-6">
            <Tab task={true} />
            <React.Fragment>
              <ProjectDetailsLayout />
            </React.Fragment>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <AddNewInvoice />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProjectDetail;
