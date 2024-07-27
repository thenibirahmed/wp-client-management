import React, { useState, useEffect } from "react";

import EmptyTable from "../helper/EmptyTable";

import ProjectTable from "./ProjectTable";

import ProjectOverView from "./ProjectOverView";

import { UserCircle02Icon } from "../../utils/icons";

import Modal from "../helper/Modal";
import { useStoreContext } from "../../store/ContextApiStore";
import AddNewProjectForm from "../helper/forms/AddNewProjectForm";
import ProjectHeader from "../helper/projects/ProjectHeader";

const Projects = () => {
  const { openProjectModal, setOpenProjectModal } = useStoreContext();
  const dataList = [1];

  return (
    <React.Fragment>
      <ProjectOverView />
      <div className="space-y-6">
        <ProjectHeader />

        <React.Fragment>
          {dataList.length > 0 ? (
            <>
              <ProjectTable />
            </>
          ) : (
            <>
              <EmptyTable
                Icon={UserCircle02Icon}
                setOpen={setOpen}
                title="  Clients Not Yet Registered"
                subtitle="Start building your client list."
                btnText=" Add Client"
              />
            </>
          )}
        </React.Fragment>
      </div>

      <Modal open={openProjectModal} setOpen={setOpenProjectModal}>
        <AddNewProjectForm />
      </Modal>
    </React.Fragment>
  );
};

export default Projects;
