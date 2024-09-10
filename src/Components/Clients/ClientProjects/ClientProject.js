import React, { useState } from "react";

import ClientProjectTable from "./ClientProjectTable";
import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon } from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";
import Modal from "../../helper/Modal";
import ProjectHeader from "../../helper/projects/ProjectHeader";
import AddNewClientProjectForm from "../../helper/forms/AddNewClientProjectForm";
import { useFetchClientProject } from "../../../hooks/useQuery";
import toast from "react-hot-toast";

const ClientProject = ({ clientId }) => {
  const { openProjectModal, setOpenProjectModal } = useStoreContext();

  const [selectedProject, setSelectedProject] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const {
    isLoading,
    data: projectTask,
    error,
    refetch,
  } = useFetchClientProject(clientId, onError);

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed To Fetch Project Task");
  }

  const dataList = [1];

  const handler = () => {
    setOpenProjectModal(true);
  };

  const onDeleteAction = (ids) => {
    alert(ids[0].id);
  };
  const onCheckAction = (ids) => {
    alert(ids[0].id);
  };

  return (
    <React.Fragment>
      <ProjectHeader
        selectedProject={selectedProject}
        title="All Project"
        setOpenModal={setOpenProjectModal}
        btnTitle="Add Project"
        onDeleteAction={onDeleteAction}
        onCheckAction={onCheckAction}
      />
      {dataList?.length > 0 ? (
        <>
          <ClientProjectTable
            selectedClient={selectedProject}
            setSelectedClient={setSelectedProject}
            isAllselected={isAllselected}
            setIsAllSelected={setIsAllSelected}
          />
        </>
      ) : (
        <>
          <EmptyTable
            Icon={Invoice01Icon}
            handler={handler}
            title="Projects Await Initiation"
            subtitle="Initiate your first project now."
            btnText="Add Project"
          />
        </>
      )}
      <Modal
        open={openProjectModal}
        setOpen={setOpenProjectModal}
        title="Add Project"
      >
        <AddNewClientProjectForm />
      </Modal>
    </React.Fragment>
  );
};

export default ClientProject;
