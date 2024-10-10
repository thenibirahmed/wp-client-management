import React from "react";
import ClientProject from "./ClientProjects/ClientProject";
import ClientInvoices from "./ClientInvoices/ClientInvoices";
import ClientNotes from "./ClientNotes/ClientNotes";
import ClientFiles from "./ClientFiles/ClientFiles";
import ClientEmails from "./ClientEmails/ClientEmails";
import ClientAddiInfo from "./ClientAddiInfo/ClientAddiInfo";
import { useStoreContext } from "../../store/ContextApiStore";

const ClientDetailsLayout = ({ clientId }) => {
  const { allTabItems } = useStoreContext();

  if (allTabItems["project"]) {
    return <ClientProject clientId={clientId} />;
  } else if (allTabItems["invoice"]) {
    return <ClientInvoices clientId={clientId} />;
  } else if (allTabItems["note"]) {
    return <ClientNotes clientId={clientId} />;
  } else if (allTabItems["file"]) {
    return <ClientFiles clientId={clientId} />;
  } else if (allTabItems["email"]) {
    return <ClientEmails clientId={clientId} />;
  } else if (allTabItems["info"]) {
    return <ClientAddiInfo clientId={clientId} />;
  } else {
    return <ClientProject />;
  }
};

export default ClientDetailsLayout;
