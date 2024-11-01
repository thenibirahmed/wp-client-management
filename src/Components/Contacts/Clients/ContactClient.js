import React, { useState } from "react";

import TabHeader from "../TabHeader";
import EmptyTable from "../../helper/EmptyTable";
import Modal from "../../helper/Modal";
import ContactClientTable from "../../helper/contacts/ContactClientTable";
import AddClientForm from "../../Clients/AddClientForm";
import { useBulkDelete, useFetchClients } from "../../../hooks/useQuery";
import useHashRouting from "../../../utils/useHashRouting";
import Skeleton from "../../Skeleton";
import { UserCircle02Icon } from "../../../utils/icons";
import { useRefetch } from "../../../hooks/useRefetch";
import { useStoreContext } from "../../../store/ContextApiStore";
import { BulkDeleteModal } from "../../BulkDeleteModal";
import Errors from "../../Errors";

const ContactClient = () => {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);
  const [loader, setLoader] = useState(false);

  const { bulkDeleteTeamClient, setBulkDeleteTeamClient } = useStoreContext();

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "page=1";

  const [searchText, setSearchText] = useState("");

  const {
    isLoading,
    data: clientList,
    error,
    refetch,
  } = useFetchClients(paginationUrl, searchText, "", "", onError);

  useRefetch(paginationUrl, searchText, null, null, null, null, refetch);
  const onDeleteAction = async (ids) => {
    await useBulkDelete(
      "/clients/bulk-delete",
      ids,
      refetch,
      setLoader,
      true,
      setBulkDeleteTeamClient
    );
    setSelectedClient([]);
  };
  function onError(err) {
    console.log(err);
    toast.error("Failed to fetchClientOverView data");
  }

  if (isLoading) return <Skeleton />;

  if (error)
    return (
      <Errors
        message={
          error?.response?.data?.errors?.message || "Internal Server Error"
        }
      />
    );

  return (
    <React.Fragment>
      <TabHeader
        setOpen={setOpen}
        btn="Add Client"
        selectedClient={selectedClient}
        setSearchText={setSearchText}
        searchText={searchText}
        setOpenBulkActionModal={setBulkDeleteTeamClient}
        loader={loader}
      />
      {clientList.clients.length > 0 ? (
        <>
          <ContactClientTable
            clientData={clientList?.clients}
            pagination={clientList?.pagination}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            isAllselected={isAllselected}
            setIsAllSelected={setIsAllSelected}
            refetch={refetch}
          />
        </>
      ) : (
        <>
          <EmptyTable
            Icon={UserCircle02Icon}
            setOpen={setOpen}
            title="  Clients Not Yet Registered"
            subtitle="Start building your client list."
            btnText="Add Client"
          />
        </>
      )}
      <Modal open={open} setOpen={setOpen} title="Add Client">
        <AddClientForm setOpen={setOpen} refetch={refetch} />
      </Modal>

      <BulkDeleteModal
        loader={loader}
        open={bulkDeleteTeamClient}
        setOpen={setBulkDeleteTeamClient}
        onDeleteAction={() => onDeleteAction(selectedClient)}
        title="Delete Client"
      />
    </React.Fragment>
  );
};

export default ContactClient;
