import React, { useState, useEffect } from "react";

import { FileAddIcon } from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";
import EmptyTable from "../../helper/EmptyTable";
import Modal from "../../helper/Modal";
import FileTable from "../../helper/files/FileTable";
import FileHeader from "../../helper/files/FileHeader";
import AddNewFileForm from "../../helper/forms/AddNewFileForm";
import { useFetchProjectFiles } from "../../../hooks/useQuery";
import Errors from "../../Errors";
import Skeleton from "../../Skeleton";
import useHashRouting from "../../../utils/useHashRouting";
import { useRefetch } from "../../../hooks/useRefetch";

const ProjectFile = ({ projectId }) => {
  const { openFileModal, setOpenFileModal } = useStoreContext();

  const [selectedFile, setSelectedFile] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "file=1";

  const {
    isLoading,
    data: projectFiles,
    error,
    refetch,
  } = useFetchProjectFiles(projectId, paginationUrl, "project", onError);

  useRefetch(paginationUrl, refetch);

  const handler = () => {
    setOpenFileModal(true);
  };

  function onError(err) {
    console.log(err);
    toast.error(
      err?.response?.data?.message || "Failed To Fetch Project Files"
    );
  }

  if (error) {
    return (
      <Errors
        message={
          error?.response?.data?.errors ||
          `Failed To Fetch Project Files for projectId ${projectId}`
        }
      />
    );
  }

  return (
    <React.Fragment>
      <FileHeader />
      <React.Fragment>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {projectFiles?.files?.length > 0 ? (
              <>
                <FileTable
                  fileData={projectFiles?.files}
                  projectId={projectId}
                  pagination={projectFiles?.pagination}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  isAllselected={isAllselected}
                  setIsAllSelected={setIsAllSelected}
                  slug="projects"
                  refetch={refetch}
                  type="project"
                />
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
          </>
        )}
      </React.Fragment>
      <Modal open={openFileModal} setOpen={setOpenFileModal} title="Add File">
        <AddNewFileForm
          refetch={refetch}
          setOpen={setOpenFileModal}
          type="project"
          id={projectId}
        />
      </Modal>
    </React.Fragment>
  );
};

export default ProjectFile;
