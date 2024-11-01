import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import EmptyTable from "../helper/EmptyTable";
import ProjectOverView from "./ProjectOverView";
import { UserCircle02Icon } from "../../utils/icons";
import Modal from "../helper/Modal";
import { useStoreContext } from "../../store/ContextApiStore";
import ProjectHeader from "../helper/projects/ProjectHeader";
import ProjectTable from "../helper/projects/ProjectTable";
import AddNewProjectForm from "../helper/forms/AddNewProjectForm";
import ProjectTaskDetails from "./ProjectTask/ProjectTaskDetails";
import Skeleton from "../Skeleton";
import Errors from "../Errors";
import useHashRouting from "../../utils/useHashRouting";
import { useRefetch } from "../../hooks/useRefetch";
import {
  useBulkComplete,
  useBulkDelete,
  useFetchAllProjects,
} from "../../hooks/useQuery";
import { BulkDeleteModal } from "../BulkDeleteModal";

const Projects = () => {
  const [loader, setLoader] = useState(false);
  const [selectCurrency, setSelectCurrency] = useState();

  const {
    openProjectModal,
    setOpenProjectModal,
    setAllTabItems,
    openTaskDetail,
    setOpenTaskDesc,
    selectStatus,
    setSelectStatus,
    selectPriority,
    setSelectPriority,
    setSelectedFilter,
    searchText,
    setSearchText,
    setCreateInvoice,
    bulkDeleteProject,
    setBulkDeleteProject,
  } = useStoreContext();

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "page=1";

  const [selectedProject, setSelectedProject] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const [dateRange, setDateRange] = useState([
    dayjs().subtract(3, "month").toDate(),
    new Date(),
  ]);

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const {
    isLoading,
    data: projects,
    error: allProjectError,
    refetch,
  } = useFetchAllProjects(
    paginationUrl,
    searchText,
    dateFrom,
    dateTo,
    selectStatus,
    selectPriority,
    onError
  );

  useRefetch(
    paginationUrl,
    searchText,
    dateFrom,
    dateTo,
    selectStatus,
    selectPriority,
    refetch
  );

  const onDeleteAction = async (ids) => {
    await useBulkDelete(
      "/projects/bulk-delete",
      ids,
      refetch,
      setLoader,
      false,
      setBulkDeleteProject
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

  useEffect(() => {
    setCreateInvoice(false);
    setAllTabItems({
      project: true,
      task: true,
      invoice: false,
      note: false,
      file: false,
      email: false,
      info: false,
    });
    setOpenTaskDesc(false);
  }, []);

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetch all projects or project Overview data");
  }

  if (allProjectError) {
    return <Errors message="Internal Server Error" />;
  }

  return (
    <React.Fragment>
      {openTaskDetail ? (
        <ProjectTaskDetails />
      ) : (
        <>
          <ProjectOverView
            dateRange={dateRange}
            setDateRange={setDateRange}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
            setSelectStatus={setSelectStatus}
            setSelectPriority={setSelectPriority}
            setSelectedFilter={setSelectedFilter}
            setSearchText={setSearchText}
            selectCurrency={selectCurrency}
            setSelectCurrency={setSelectCurrency}
          />

          <div className="space-y-6">
            <>
              <ProjectHeader
                selectedProject={selectedProject}
                title="All Project"
                setOpenModal={setOpenProjectModal}
                btnTitle="Add Project"
                setOpenBulkActionModal={setBulkDeleteProject}
                onCheckAction={onCheckAction}
                searchText={searchText}
                setSearchText={setSearchText}
                loader={loader}
                filter
              />
            </>
            {!isLoading ? (
              <React.Fragment>
                {projects?.projects?.length > 0 ? (
                  <>
                    <ProjectTable
                      projectData={projects.projects}
                      pagination={projects.pagination}
                      selectedProject={selectedProject}
                      setSelectedProject={setSelectedProject}
                      isAllselected={isAllselected}
                      setIsAllSelected={setIsAllSelected}
                      refetch={refetch}
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
            ) : (
              <Skeleton />
            )}
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
      <BulkDeleteModal
        loader={loader}
        open={bulkDeleteProject}
        setOpen={setBulkDeleteProject}
        onDeleteAction={() => onDeleteAction(selectedProject)}
        title="Delete Project"
      />
    </React.Fragment>
  );
};

export default Projects;
