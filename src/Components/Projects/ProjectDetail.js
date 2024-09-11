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
import Errors from "../Errors";

const extractProjectId = (url) => {
  const match = url.match(/projects\/#\/(\d+)/);
  return match ? match[1] : null;
};

const ProjectDetail = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const { createInvoice } = useStoreContext();

  const projectId = extractProjectId(currentPath);

  const {
    isLoading,
    data: singleProjectOverView,
    error,
  } = useFetchSingleProjectOverView(projectId, onError);

  function onError(err) {
    console.log(err);
  }

  if (isLoading) return <Skeleton />;

  if (error) {
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
              <ProjectDetailsLayout projectId={projectId} />
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
