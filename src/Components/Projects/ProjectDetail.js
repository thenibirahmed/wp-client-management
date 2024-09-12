import React, { useEffect } from "react";

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
import ProjectTaskDetails from "./ProjectTask/ProjectTaskDetails";

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
  } = useStoreContext();

  const projectId = extractProjectId(currentPath);

  const {
    isLoading,
    data: singleProjectOverView,
    error,
  } = useFetchSingleProjectOverView(projectId, onError);

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
      {!createInvoice && !updateInvoice && !openTaskDesc ? (
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
          {openTaskDesc ? (
            <ProjectTaskDetails />
          ) : (
            <AddNewInvoice update={updateInvoice} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProjectDetail;
