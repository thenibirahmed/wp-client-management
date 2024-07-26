import React, { useState } from "react";
import ClientProjectTable from "./ClientProjectTable";
import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon } from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";
import ClientProjectHeader from "./ClientProjectHeader";
import { ProjectModal } from "../../helper/ProjectModal";

const ClientProject = () => {
  const { openProjectModal, setOpenProjectModal } = useStoreContext();
  const dataList = [1];

  const handler = () => {
    setOpenProjectModal(true);
  };
  return (
    <React.Fragment>
      <ClientProjectHeader />
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
      <ProjectModal />
    </React.Fragment>
  );
};

export default ClientProject;
