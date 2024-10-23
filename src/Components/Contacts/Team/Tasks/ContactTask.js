import React, { useState } from "react";
import ContactTeamTaskTable from "../../../helper/contacts/ContactTask/ContactTeamTaskTable";
import useHashRouting from "../../../../utils/useHashRouting";
import {
  useBulkComplete,
  useBulkDelete,
  useFetchSingleTeamTasks,
} from "../../../../hooks/useQuery";
import EmptyTable from "../../../helper/EmptyTable";
import toast from "react-hot-toast";
import Skeleton from "../../../Skeleton";
import { UserCircle02Icon } from "../../../../utils/icons";
import { useRefetch } from "../../../../hooks/useRefetch";
import ProjectHeader from "../../../helper/projects/ProjectHeader";
import { useStoreContext } from "../../../../store/ContextApiStore";
import Modal from "../../../helper/Modal";
import AddNewTaskForm from "../../../helper/projectTask/AddNewTaskForm";

const ContactTask = ({ teamId }) => {
  const [loader, setLoader] = useState(false);

  const { openTask, setOpenTask, searchText, setSearchText, setIsFetching } =
    useStoreContext();

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "task=1";
  const [selectedTask, setSelectedTask] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const {
    isLoading,
    data: taskLists,
    error,
    refetch,
  } = useFetchSingleTeamTasks(teamId, paginationUrl, searchText, onError);

  useRefetch(
    paginationUrl,
    searchText,
    null,
    null,
    null,
    null,
    refetch,
    null,
    true,
    teamId
  );

  const onDeleteAction = async (ids) => {
    setIsFetching(true);
    await useBulkDelete("/tasks/bulk-delete", ids, refetch, setLoader, false);
    setSelectedTask([]);
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
    setSelectedTask([]);
  };

  if (isLoading) return <Skeleton />;

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.errors || "Failed to fetch task data");
  }

  return (
    <React.Fragment>
      <div className="space-y-6">
        {" "}
        <ProjectHeader
          selectedProject={selectedTask}
          title="Tasks"
          setOpenModal={setOpenTask}
          btnTitle="Add Task"
          onDeleteAction={onDeleteAction}
          onCheckAction={onCheckAction}
          loader={loader}
          setSearchText={setSearchText}
          searchText={searchText}
        />
        {taskLists?.task?.length > 0 ? (
          <ContactTeamTaskTable
            teamId={teamId}
            taskLists={taskLists?.task}
            pagination={taskLists?.pagination}
            selectedClient={selectedTask}
            setSelectedClient={setSelectedTask}
            isAllselected={isAllselected}
            setIsAllSelected={setIsAllSelected}
          />
        ) : (
          <>
            <EmptyTable
              handler={() => {}}
              Icon={UserCircle02Icon}
              setOpen={() => {}}
              title="  No Task Created Yet"
              subtitle="Start building your Project list"
              btnText=" Add Project"
              bottom
            />
          </>
        )}
      </div>
      <Modal open={openTask} setOpen={setOpenTask} title="Add Task">
        <AddNewTaskForm refetch={refetch} setOpen={setOpenTask} contact />
      </Modal>
    </React.Fragment>
  );
};

export default ContactTask;
