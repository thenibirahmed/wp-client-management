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
import {
  useFetchAllProjects,
  useFetchProjectOverView,
} from "../../hooks/useQuery";
import Skeleton from "../Skeleton";
import toast from "react-hot-toast";
import Errors from "../Errors";
import useHashRouting from "../../utils/useHashRouting";
import { useRefetch } from "../../hooks/useRefetch";

const Projects = () => {
  const {
    openProjectModal,
    setOpenProjectModal,
    setAllTabItems,
    openTaskDetail,
  } = useStoreContext();
  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "page=1";

  const [selectedProject, setSelectedProject] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const {
    isLoading: allProjectLoader,
    data: projects,
    error: allProjectError,
    refetch,
  } = useFetchAllProjects(paginationUrl, onError);

  useRefetch(paginationUrl, refetch);

  const {
    isLoading: projectOverViewLoader,
    data: projectOverView,
    error: projectOverViewError,
  } = useFetchProjectOverView(onError);

  let isLoading = allProjectLoader || projectOverViewLoader;

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetch all projects or project Overview data");
  }

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

  const onDeleteAction = (ids) => {
    alert(ids[0].id);
  };
  const onCheckAction = (ids) => {
    alert(ids[0].id);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (projectOverViewError || allProjectError) {
    return <Errors message="Internal Server Error" />;
  }

  return (
    <React.Fragment>
      {openTaskDetail ? (
        <ProjectTaskDetails />
      ) : (
        <>
          <ProjectOverView projectOverView={projectOverView?.projectOverView} />
          <div className="space-y-6">
            <>
              <ProjectHeader
                selectedProject={selectedProject}
                title="All Project"
                setOpenModal={setOpenProjectModal}
                btnTitle="Add Project"
                onDeleteAction={onDeleteAction}
                onCheckAction={onCheckAction}
              />
            </>
            <React.Fragment>
              {projects.projects.length > 0 ? (
                <>
                  <ProjectTable
                    projectData={projects.projects}
                    pagination={projects.pagination}
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                    isAllselected={isAllselected}
                    setIsAllSelected={setIsAllSelected}
                    refetch={refetch}
                    setOpen={setOpenProjectModal}
                    open={openProjectModal}
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
            </React.Fragment>
          </div>

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
      )}
    </React.Fragment>
  );
};

export default Projects;
