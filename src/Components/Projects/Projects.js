import React, { useState, useEffect } from "react";

import EmptyTable from "../helper/EmptyTable";

import ProjectOverView from "./ProjectOverView";

import { UserCircle02Icon } from "../../utils/icons";

import Modal from "../helper/Modal";
import { useStoreContext } from "../../store/ContextApiStore";

import ProjectHeader from "../helper/projects/ProjectHeader";
import ProjectTable from "../helper/projects/ProjectTable";
import AddNewProjectForm from "../helper/forms/AddNewProjectForm";
import ProjectTaskDetails from "./ProjectTask/ProjectTaskDetails";

const Projects = () => {
  const {
    openProjectModal,
    setOpenProjectModal,
    setAllTabItems,
    openTaskDetail,
    setOpenTaskDetail,
  } = useStoreContext();
  const dataList = [1];

  useEffect(() => {
    setAllTabItems({
      project: true,
      task: true,
      invoice: false,
      note: false,
      file: false,
      email: false,
      info: false,
    });
  }, []);

  return (
    <React.Fragment>
      {openTaskDetail ? (
        <ProjectTaskDetails />
      ) : (
        <>
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

          <Modal
            open={openProjectModal}
            setOpen={setOpenProjectModal}
            title="Add Project"
          >
            <AddNewProjectForm />
          </Modal>
        </>
      )}
    </React.Fragment>
  );
};

export default Projects;