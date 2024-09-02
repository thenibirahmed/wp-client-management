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
import { useFetchAllProjects } from "../../hooks/useQuery";
import Skeleton from "../Skeleton";

const Projects = () => {
  const [open, setOpen] = useState(false);
  const {
    openProjectModal,
    setOpenProjectModal,
    setAllTabItems,
    openTaskDetail,
    setOpenTaskDetail,
  } = useStoreContext();

  const { isLoading, data: projects } = useFetchAllProjects(onError);

  console.log("projects = ", projects);

  function onError(err) {
    console.log(err);
  }

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
              {isLoading ? (
                <Skeleton />
              ) : (
                <>
                  {dataList.length > 0 ? (
                    <>
                      <ProjectTable
                        projectData={projects.projects}
                        pagination={projects.pagination}
                      />
                    </>
                  ) : (
                    <>
                      <EmptyTable
                        handler={() => setOpenProjectModal(true)}
                        Icon={UserCircle02Icon}
                        setOpen={setOpenProjectModal}
                        title="  No Project Created Yer"
                        subtitle="Start building your Project list"
                        btnText=" Add Project"
                      />
                    </>
                  )}
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
