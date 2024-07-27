import React, { useState } from "react";
import ClientProjectTable from "./ClientProjectTable";
import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon } from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";
import Modal from "../../helper/Modal";

import ProjectHeader from "../../helper/projects/ProjectHeader";

import AddNewClientProjectForm from "../../helper/forms/AddNewClientProjectForm";

const ClientProject = () => {
  const { openProjectModal, setOpenProjectModal } = useStoreContext();
  const dataList = [1];

  const handler = () => {
    setOpenProjectModal(true);
  };
  return (
    <React.Fragment>
      <ProjectHeader />
      {dataList.length > 0 ? (
        <>
          <ClientProjectTable />
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
