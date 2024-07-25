import React, { useState } from "react";
import ClientProjectTable from "./ClientProjectTable";
import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon } from "../../../utils/icons";
import { ClientProjectModal } from "./ClientProjectModal";
import { useStoreContext } from "../../../store/ContextApiStore";
import ClientProjectHeader from "./ClientProjectHeader";

const ClientProject = () => {
  const { openProjectModal, setOpenProjectModal } = useStoreContext();
  const dataList = [1];
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
            setOpenProjectModal={setOpenProjectModal}
            title="Projects Await Initiation"
            subtitle="Initiate your first project now."
            btnText="Add Project"
          />
        </>
      )}
      <ClientProjectModal
        openProjectModal={openProjectModal}
        setOpenProjectModal={setOpenProjectModal}
      />
    </React.Fragment>
  );
};

export default ClientProject;
