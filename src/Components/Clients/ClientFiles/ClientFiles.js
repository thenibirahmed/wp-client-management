import React from "react";
import ClientFileTable from "./ClientFileTable";
import { FileAddIcon } from "../../../utils/icons";
import { ClientFileModal } from "./ClientFileModal";
import ClientFileHeader from "./ClientFileHeader";
import { useStoreContext } from "../../../store/ContextApiStore";
import EmptyTable from "../../helper/EmptyTable";

const ClientFiles = () => {
  const { openFileModal, setOpenFileModal } = useStoreContext();

  const handler = () => {
    setOpenFileModal(true);
  };
  const dataList = [0];
  return (
    <React.Fragment>
      <ClientFileHeader />
      {dataList.length > 0 ? (
        <>
          <ClientFileTable />
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
      <ClientFileModal
        openFileModal={openFileModal}
        setOpenFileModal={setOpenFileModal}
      />
    </React.Fragment>
  );
};

export default ClientFiles;
