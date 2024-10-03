import React, { useState } from "react";

import TabHeader from "../TabHeader";
import EmptyTable from "../../helper/EmptyTable";
import Modal from "../../helper/Modal";
import ContactClientTable from "../../helper/contacts/ContactClientTable";
import AddClientForm from "../../Clients/AddClientForm";
import { useFetchClients } from "../../../hooks/useQuery";
import useHashRouting from "../../../utils/useHashRouting";
import Skeleton from "../../Skeleton";

const ContactClient = () => {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

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
      />
      {clientList.clients.length > 0 ? (
        <>
          <ContactClientTable
            clientData={clientList?.clients}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            isAllselected={isAllselected}
            setIsAllSelected={setIsAllSelected}
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
        <AddClientForm setOpen={setOpen} />
      </Modal>
    </React.Fragment>
  );
};

export default ContactClient;
