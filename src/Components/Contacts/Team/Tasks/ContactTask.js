import React from "react";
import ContactTeamTaskTable from "../../../helper/contacts/ContactTask/ContactTeamTaskTable";
import useHashRouting from "../../../../utils/useHashRouting";
import { useFetchSingleTeamTasks } from "../../../../hooks/useQuery";
import EmptyTable from "../../../helper/EmptyTable";
import toast from "react-hot-toast";
import Skeleton from "../../../Skeleton";
import { UserCircle02Icon } from "../../../../utils/icons";

const ContactTask = ({ teamId }) => {
  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "project=1";

  const {
    isLoading,
    data: taskLists,
    error,
    refetch,
  } = useFetchSingleTeamTasks(teamId, paginationUrl, onError);

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.errors || "Failed to fetch task data");
  }
  if (isLoading) return <Skeleton />;
  return (
    <React.Fragment>
      {taskLists?.team?.length > 0 ? (
        <>
          {" "}
          <ContactTeamTaskTable
            teamId={teamId}
            taskLists={taskLists?.task}
            pagination={taskLists?.pagination}
          />
        </>
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
