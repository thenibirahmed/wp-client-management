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
import { useRefetch } from "../../../hooks/useRefetch";
import useHashRouting from "../../../utils/useHashRouting";
import Errors from "../../Errors";
import Skeleton from "../../Skeleton";
import api from "../../../api/api";

const ClientProject = ({ clientId }) => {
  const {
    openProjectModal,
    setOpenProjectModal,
    dateFrom,
    dateTo,
    selectStatus,
    setSelectStatus,
    selectPriority,
    setSelectPriority,
    searchText,
    setSearchText,
  } = useStoreContext();

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "project=1";

  const [selectedProject, setSelectedProject] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const {
    isLoading,
    data: clientProjects,
    error,
    refetch,
  } = useFetchClientProject(
    clientId,
    searchText,
    dateFrom,
    dateTo,
    selectStatus,
    selectPriority,
    paginationUrl,
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

  const handler = () => {
    setOpenProjectModal(true);
  };

  const onDeleteAction = async (ids) => {
    const bulk_ids = ids.map((item) => item.id);
    console.log("bulk_ids", bulk_ids);
    try {
      const { data } = await api.delete(`/projects/bulk-delete`, {
        headers: {
          data: {
            bulk_ids,
          },
        },
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const onCheckAction = async (ids) => {
    const bulk_ids = ids.map((item) => item.id);

    try {
      const { data } = await api.put(
        `/projects/bulk-complete?bulk_ids=${bulk_ids}`
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Skeleton />;

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed To Fetch Project Task");
  }

  if (error) {
    console.log("project task error", error?.response?.data?.errors);
    return (
      <Errors
        message={
          error?.response?.data?.errors ||
          `Failed To Fetch Client Project Data for clientId ${clientId}`
        }
      />
    );
  }

  return (
    <React.Fragment>
      <ProjectHeader
        selectedProject={selectedProject}
        title="All Project"
        setOpenModal={setOpenProjectModal}
        btnTitle="Add Project"
        onDeleteAction={onDeleteAction}
        onCheckAction={onCheckAction}
        searchText={searchText}
        setSearchText={setSearchText}
        filter
      />
      {clientProjects?.projects?.length > 0 ? (
        <>
          <ClientProjectTable
            selectedClient={selectedProject}
            setSelectedClient={setSelectedProject}
            isAllselected={isAllselected}
            setIsAllSelected={setIsAllSelected}
            projectData={clientProjects?.projects}
            pagination={clientProjects?.pagination}
            clientId={clientId}
            refetch={refetch}
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
        <AddNewClientProjectForm clientId={clientId} refetch={refetch} />
      </Modal>
    </React.Fragment>
  );
};

export default ClientProject;
