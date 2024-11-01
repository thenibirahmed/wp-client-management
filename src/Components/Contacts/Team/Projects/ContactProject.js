import React, { useState } from "react";
import ContactTeamProjectTable from "../../../helper/contacts/ContactProject/ContactTeamProjectTable";
import useHashRouting from "../../../../utils/useHashRouting";
import {
  useBulkComplete,
  useBulkDelete,
  useFetchSingleTeamProject,
} from "../../../../hooks/useQuery";
import toast from "react-hot-toast";
import EmptyTable from "../../../helper/EmptyTable";
import { UserCircle02Icon } from "../../../../utils/icons";
import Skeleton from "../../../Skeleton";
import ProjectHeader from "../../../helper/projects/ProjectHeader";
import Modal from "../../../helper/Modal";
import AddNewProjectForm from "../../../helper/forms/AddNewProjectForm";
import { useStoreContext } from "../../../../store/ContextApiStore";
import { useRefetch } from "../../../../hooks/useRefetch";
import { BulkDeleteModal } from "../../../BulkDeleteModal";

const ContactProject = ({ teamId }) => {
  const currentPath = useHashRouting("");
  const [loader, setLoader] = useState(false);
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "project=1";
  const [selectedProject, setSelectedProject] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const {
    openProjectModal,
    setOpenProjectModal,
    searchText,
    setSearchText,
    bulkDeleteTeamProject,
    setBulkDeleteTeamProject,
  } = useStoreContext();

  const {
    isLoading,
    data: teamLists,
    error,
    refetch,
  } = useFetchSingleTeamProject(teamId, paginationUrl, searchText, onError);

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
    await useBulkDelete(
      "/projects/bulk-delete",
      ids,
      refetch,
      setLoader,
      false,
      setBulkDeleteTeamProject
    );
    setSelectedProject([]);
  };
  const onCheckAction = async (ids) => {
    await useBulkComplete(
      "/projects/bulk-complete",
      ids,
      refetch,
      setLoader,
      false
    );
    setSelectedProject([]);
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
            setOpenModal={setOpenProjectModal}
            btnTitle="Add Project"
            setOpenBulkActionModal={setBulkDeleteTeamProject}
            onCheckAction={onCheckAction}
            setSearchText={setSearchText}
            searchText={searchText}
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

        <>
          <Modal
            open={openProjectModal}
            setOpen={setOpenProjectModal}
            title="Add Project"
          >
            <AddNewProjectForm
              refetch={refetch}
              setOpen={setOpenProjectModal}
            />
          </Modal>
        </>
      </div>

      <BulkDeleteModal
        loader={loader}
        open={bulkDeleteTeamProject}
        setOpen={setBulkDeleteTeamProject}
        onDeleteAction={() => onDeleteAction(selectedProject)}
        title="Delete Project"
      />
    </React.Fragment>
  );
};

export default ContactProject;
