import React, { useState } from "react";
import toast from "react-hot-toast";

import { FileAddIcon } from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";
import EmptyTable from "../../helper/EmptyTable";
import Modal from "../../helper/Modal";
import FileTable from "../../helper/files/FileTable";
import AddNewFileForm from "../../helper/forms/AddNewFileForm";
import ProjectHeader from "../../helper/projects/ProjectHeader";
import useHashRouting from "../../../utils/useHashRouting";
import { useBulkDelete, useFetchProjectFiles } from "../../../hooks/useQuery";
import { useRefetch } from "../../../hooks/useRefetch";
import Errors from "../../Errors";
import Skeleton from "../../Skeleton";
import { BulkDeleteModal } from "../../BulkDeleteModal";

const ClientFiles = ({ clientId }) => {
  const [loader, setLoader] = useState(false);
  const {
    openFileModal,
    setOpenFileModal,
    dateFrom,
    dateTo,
    searchText,
    setSearchText,
    setIsFetching,
    bulkDeleteClientFile,
    setBulkDeleteClientFile,
  } = useStoreContext();

  const [selectedFile, setSelectedFile] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "file=1";

  const {
    isLoading,
    data: clientFiles,
    error,
    refetch,
  } = useFetchProjectFiles(
    clientId,
    paginationUrl,
    searchText,
    dateFrom,
    dateTo,
    "client",
    onError
  );

  useRefetch(paginationUrl, searchText, dateFrom, dateTo, null, null, refetch);

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed To Fetch Client Files");
  }

  const handler = () => {
    setOpenFileModal(true);
  };

  const onDeleteAction = async (ids) => {
    setIsFetching(true);
    await useBulkDelete(
      "/files/bulk-delete",
      ids,
      refetch,
      setLoader,
      false,
      setBulkDeleteClientFile
    );
    setSelectedFile([]);
    setIsFetching(false);
  };
  const onCheckAction = (ids) => {};

  if (error) {
    return (
      <Errors
        message={
          error?.response?.data?.errors ||
          `Failed To Fetch Client File Data for clientId ${clientId}`
        }
      />
    );
  }

  return (
    <React.Fragment>
      <ProjectHeader
        selectedProject={selectedFile}
        title="Files"
        setOpenModal={setOpenFileModal}
        btnTitle="Add File"
        setOpenBulkActionModal={setBulkDeleteClientFile}
        onCheckAction={onCheckAction}
        setSearchText={setSearchText}
        searchText={searchText}
        check={false}
        loader={loader}
      />

      {clientFiles?.files?.length > 0 ? (
        <>
          {isLoading ? (
            <Skeleton />
          ) : (
            <FileTable
              fileData={clientFiles?.files}
              projectId={clientId}
              pagination={clientFiles?.pagination}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              isAllselected={isAllselected}
              setIsAllSelected={setIsAllSelected}
              slug="clients"
              refetch={refetch}
              type="client"
            />
          )}
        </>
      ) : (
        <>
          <EmptyTable
            Icon={FileAddIcon}
            handler={handler}
            title="Files Not Yet Added"
            subtitle="Let's begin—add your first file now!"
            btnText="Add File"
          />
        </>
      )}
      <Modal open={openFileModal} setOpen={setOpenFileModal} title="Add File">
        <AddNewFileForm
          refetch={refetch}
          setOpen={setOpenFileModal}
          type="client"
          id={clientId}
        />
      </Modal>

      <BulkDeleteModal
        loader={loader}
        open={bulkDeleteClientFile}
        setOpen={setBulkDeleteClientFile}
        onDeleteAction={() => onDeleteAction(selectedFile)}
        title="Delete File"
      />
    </React.Fragment>
  );
};

export default ClientFiles;
