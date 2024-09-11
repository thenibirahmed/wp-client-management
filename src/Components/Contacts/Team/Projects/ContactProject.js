import React from "react";
import ContactTeamProjectTable from "../../../helper/contacts/ContactProject/ContactTeamProjectTable";
import useHashRouting from "../../../../utils/useHashRouting";
import {
  useFetchSingleTeamOverview,
  useFetchSingleTeamProject,
  useFetchSingleTeamTasks,
} from "../../../../hooks/useQuery";
import toast from "react-hot-toast";
import EmptyTable from "../../../helper/EmptyTable";
import { UserCircle02Icon } from "../../../../utils/icons";
import Skeleton from "../../../Skeleton";

const ContactProject = ({ teamId }) => {
  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "project=1";

  console.log(teamId, "teamId");

  const {
    isLoading,
    data: teamLists,
    error,
    refetch,
  } = useFetchSingleTeamProject(teamId, paginationUrl, onError);

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.errors || "Failed to fetch team data");
  }

  if (isLoading) return <Skeleton />;

  return (
    <React.Fragment>
      {teamLists?.team?.length > 0 ? (
        <>
          {" "}
          <ContactTeamProjectTable
            teamId={teamId}
            teamLists={teamLists?.team}
            pagination={teamLists?.pagination}
          />
        </>
      ) : (
        <>
          <EmptyTable
            handler={() => {}}
            Icon={UserCircle02Icon}
            setOpen={() => {}}
            title="  No Team Created Yet"
            subtitle="Start building your Project list"
            btnText=" Add Project"
            bottom
          />
        </>
      )}
    </React.Fragment>
  );
};

export default ContactProject;
