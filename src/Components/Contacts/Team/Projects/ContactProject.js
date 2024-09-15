import React, { useState } from "react";
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
import ProjectHeader from "../../../helper/projects/ProjectHeader";

const ContactProject = ({ teamId }) => {
  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "project=1";
  const [selectedProject, setSelectedProject] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);
  console.log(teamId, "teamId");

  const {
    isLoading,
    data: teamLists,
    error,
    refetch,
  } = useFetchSingleTeamProject(teamId, paginationUrl, onError);
  const onDeleteAction = (ids) => {
    alert(ids[0].id);
  };
  const onCheckAction = (ids) => {
    alert(ids[0].id);
  };
  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.errors || "Failed to fetch team data");
  }

  if (isLoading) return <Skeleton />;

  return (
    <React.Fragment>
      <div className="space-y-6">
        <>
          <ProjectHeader
            selectedProject={selectedProject}
            title="Projects"
            setOpenModal={() => {}}
            btnTitle="Add Project"
            onDeleteAction={onDeleteAction}
            onCheckAction={onCheckAction}
          />
        </>
        {teamLists?.teamproject?.length > 0 ? (
          <ContactTeamProjectTable
            teamId={teamId}
            teamLists={teamLists?.teamproject}
            pagination={teamLists?.pagination}
            selectedClient={selectedProject}
            setSelectedClient={setSelectedProject}
            isAllselected={isAllselected}
            setIsAllSelected={setIsAllSelected}
          />
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
      </div>
    </React.Fragment>
  );
};

export default ContactProject;
