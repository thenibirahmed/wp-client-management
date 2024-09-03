import React, { useState } from "react";

import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon, Task01Icon } from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";

import Modal from "../../helper/Modal";
import ProjectTaskTable from "../../helper/projectTask/ProjectTaskTable";
import ProjectTaskHeader from "../../helper/projectTask/ProjectTaskHeader";
import AddNewTaskForm from "../../helper/projectTask/AddNewTaskForm";
import { useFetchProjectTask } from "../../../hooks/useQuery";
import Errors from "../../Errors";
import Skeleton from "../../Skeleton";
import toast from "react-hot-toast";

const ProjectTask = ({ projectId }) => {
  const { openTask, setOpenTask } = useStoreContext();

  const {
    isLoading,
    data: projectTask,
    error,
  } = useFetchProjectTask(projectId, onError);

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed To Fetch Project Task");
  }

  const handler = () => {
    setOpenProjectModal(true);
  };

  if (error) {
    console.log("project task error", error?.response?.data?.errors);
    return (
      <Errors
        message={
          error?.response?.data?.errors ||
          `Failed To Fetch Project Task for projectId ${projectId}`
        }
      />
    );
  }

  return (
    <React.Fragment>
      <ProjectTaskHeader />
      <React.Fragment>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {projectTask?.task?.length > 0 ? (
              <>
                <ProjectTaskTable taskData={projectTask?.task} />
              </>
            ) : (
              <>
                <EmptyTable
                  Icon={Task01Icon}
                  handler={handler}
                  title="Projects Await Initiation"
                  subtitle="Initiate your first project now."
                  btnText="Add Project"
                />
              </>
            )}
          </>
        )}
      </React.Fragment>
      <Modal open={openTask} setOpen={setOpenTask} title="Add Task">
        <AddNewTaskForm />
      </Modal>
    </React.Fragment>
  );
};

export default ProjectTask;
