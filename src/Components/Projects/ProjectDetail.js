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

const ProjectDetail = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const { createInvoice } = useStoreContext();

  const { isLoading, data: singleProjectOverView } =
    useFetchSingleProjectOverView(pathArray[1], onError);

  console.log("singleClientOverView", singleProjectOverView);

  function onError(err) {
    toast.error("Something went wrong Single Project Overview");
    console.log(err);
  }

  if (isLoading) return <Skeleton />;

  return (
    <React.Fragment>
      {!createInvoice ? (
        <React.Fragment>
          <ProjectInfo />
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
