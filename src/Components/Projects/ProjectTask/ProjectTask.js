import React, { useState } from "react";

import EmptyTable from "../../helper/EmptyTable";
import { Task01Icon } from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";
import Modal from "../../helper/Modal";
import ProjectTaskTable from "../../helper/projectTask/ProjectTaskTable";
import AddNewTaskForm from "../../helper/projectTask/AddNewTaskForm";
import {
  useBulkComplete,
  useBulkDelete,
  useFetchProjectTask,
} from "../../../hooks/useQuery";
import Errors from "../../Errors";
import Skeleton from "../../Skeleton";
import toast from "react-hot-toast";
import ProjectHeader from "../../helper/projects/ProjectHeader";
import useHashRouting from "../../../utils/useHashRouting";
import { useRefetch } from "../../../hooks/useRefetch";
import api from "../../../api/api";

const ProjectTask = ({ projectId }) => {
  const [loader, setLoader] = useState(false);
  const {
    openTask,
    setOpenTask,
    dateFrom,
    dateTo,
    selectStatus,
    setSelectStatus,
    selectPriority,
    setSelectPriority,
    searchText,
    setSearchText,
  } = useStoreContext();
  const [selectedProjectTask, setSelectedProjectTask] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "task=1";

  const {
    isLoading,
    data: projectTask,
    error,
    refetch,
  } = useFetchProjectTask(
    projectId,
    searchText,
    dateFrom,
    dateTo,
    selectStatus,
    selectPriority,
    paginationUrl,
    onError
  );

  useRefetch(
    paginationUrl,
    searchText,
    dateFrom,
    dateTo,
    selectStatus,
    selectPriority,
    refetch
  );

  const onDeleteAction = async (ids) => {
    useBulkDelete("/tasks/bulk-delete", ids, refetch, setLoader, false);
  };
  const onCheckAction = async (ids) => {
    useBulkComplete("/tasks/bulk-complete", ids, refetch, setLoader, false);
  };

  const handler = () => {
    setOpenProjectModal(true);
  };

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed To Fetch Project Task");
  }

  if (error) {
    console.log("project task error", error);
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
      <ProjectHeader
        selectedProject={selectedProjectTask}
        title="Task"
        setOpenModal={setOpenTask}
        btnTitle="Add Task"
        onDeleteAction={onDeleteAction}
        onCheckAction={onCheckAction}
        setSearchText={setSearchText}
        searchText={searchText}
        filter
        loader={loader}
      />

      <React.Fragment>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {projectTask?.task?.length > 0 ? (
              <>
                <ProjectTaskTable
                  taskData={projectTask?.task}
                  projectId={projectId}
                  pagination={projectTask?.pagination}
                  selectedClient={selectedProjectTask}
                  setSelectedClient={setSelectedProjectTask}
                  isAllselected={isAllselected}
                  setIsAllSelected={setIsAllSelected}
                  refetch={refetch}
                />
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
        <AddNewTaskForm refetch={refetch} setOpen={setOpenTask} />
      </Modal>
    </React.Fragment>
  );
};

export default ProjectTask;
