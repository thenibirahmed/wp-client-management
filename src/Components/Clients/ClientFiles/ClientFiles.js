import React from "react";
import { FileAddIcon } from "../../../utils/icons";

import { useStoreContext } from "../../../store/ContextApiStore";
import EmptyTable from "../../helper/EmptyTable";
import Modal from "../../helper/Modal";
import AddNewFileForm from "../../helper/forms/AddNewFileForm";
import FileTable from "../../helper/files/FileTable";
import FileHeader from "../../helper/files/FileHeader";

const ClientFiles = () => {
  const { openFileModal, setOpenFileModal } = useStoreContext();

  const handler = () => {
    setOpenFileModal(true);
  };
  const dataList = [0];
  return (
    <React.Fragment>
      <FileHeader />
      {dataList.length > 0 ? (
        <>
          <FileTable />
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
      <Modal open={openFileModal} setOpen={setOpenFileModal}>
        <AddNewFileForm />
      </Modal>
    </React.Fragment>
  );
};

export default ClientFiles;
