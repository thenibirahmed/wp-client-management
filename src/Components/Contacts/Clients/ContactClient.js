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

const ContactClient = () => {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);
  const [loader, setLoader] = useState(false);

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
    await useBulkDelete("/clients/bulk-delete", ids, refetch, setLoader, true);
    setSelectedClient([]);
  };
  function onError(err) {
    console.log(err);
    toast.error("Failed to fetchClientOverView data");
  }

  if (isLoading) return <Skeleton />;

  return (
    <React.Fragment>
      <TabHeader
        setOpen={setOpen}
        btn="Add Client"
        selectedClient={selectedClient}
        setSearchText={setSearchText}
        searchText={searchText}
        onClick={() => onDeleteAction(selectedClient)}
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
    </React.Fragment>
  );
};

export default ContactClient;
