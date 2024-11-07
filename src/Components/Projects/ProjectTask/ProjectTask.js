import React, { useState } from "react";
import toast from "react-hot-toast";

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
import ProjectHeader from "../../helper/projects/ProjectHeader";
import useHashRouting from "../../../utils/useHashRouting";
import { useRefetch } from "../../../hooks/useRefetch";
import { BulkDeleteModal } from "../../BulkDeleteModal";

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
    setIsFetching,
    bulkDeleteProjectTask,
    setBulkDeleteProjectTask,
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
    refetch,
    null,
    true,
    projectId
  );

  const onDeleteAction = async (ids) => {
    setIsFetching(true);
    await useBulkDelete(
      "/tasks/bulk-delete",
      ids,
      refetch,
      setLoader,
      false,
      setBulkDeleteProjectTask
    );
    setSelectedProjectTask([]);
    setIsFetching(false);
  };

  const onCheckAction = async (ids) => {
    await useBulkComplete(
      "/tasks/bulk-complete",
      ids,
      refetch,
      setLoader,
      false
    );
    setSelectedProjectTask([]);
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
        setOpenBulkActionModal={setBulkDeleteProjectTask}
        onCheckAction={onCheckAction}
        setSearchText={setSearchText}
        searchText={searchText}
        filter
        taskFilter
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

      <BulkDeleteModal
        loader={loader}
        open={bulkDeleteProjectTask}
        setOpen={setBulkDeleteProjectTask}
        onDeleteAction={() => onDeleteAction(selectedProjectTask)}
        title="Delete Task"
      />
    </React.Fragment>
  );
};

export default ProjectTask;
