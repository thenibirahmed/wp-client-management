import React, { useState } from "react";
import ContactTeamTaskTable from "../../../helper/contacts/ContactTask/ContactTeamTaskTable";
import useHashRouting from "../../../../utils/useHashRouting";
import { useFetchSingleTeamTasks } from "../../../../hooks/useQuery";
import EmptyTable from "../../../helper/EmptyTable";
import toast from "react-hot-toast";
import Skeleton from "../../../Skeleton";
import { UserCircle02Icon } from "../../../../utils/icons";
import { useRefetch } from "../../../../hooks/useRefetch";
import ProjectHeader from "../../../helper/projects/ProjectHeader";

const ContactTask = ({ teamId }) => {
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
  } = useFetchSingleTeamTasks(teamId, paginationUrl, onError);
  useRefetch(paginationUrl, refetch);
  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.errors || "Failed to fetch task data");
  }

  const onDeleteAction = (ids) => {
    alert(ids[0].id);
  };
  const onCheckAction = (ids) => {
    alert(ids[0].id);
  };
  if (isLoading) return <Skeleton />;
  return (
    <React.Fragment>
      {taskLists?.task?.length > 0 ? (
        <div className="space-y-6">
          {" "}
          <ProjectHeader
            selectedProject={selectedTask}
            title="Tasks"
            setOpenModal={() => {}}
            btnTitle="Add Task"
            onDeleteAction={onDeleteAction}
            onCheckAction={onCheckAction}
          />
          <ContactTeamTaskTable
            teamId={teamId}
            taskLists={taskLists?.task}
            pagination={taskLists?.pagination}
            selectedClient={selectedTask}
            setSelectedClient={setSelectedTask}
            isAllselected={isAllselected}
            setIsAllSelected={setIsAllSelected}
          />
        </div>
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
    </React.Fragment>
  );
};

export default ContactTask;
