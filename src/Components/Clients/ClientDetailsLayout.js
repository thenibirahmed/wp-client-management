import React from "react";
import ClientProject from "./ClientProjects/ClientProject";
import ClientInvoices from "./ClientInvoices/ClientInvoices";
import ClientNotes from "./ClientNotes/ClientNotes";
import ClientFiles from "./ClientFiles/ClientFiles";
import ClientEmails from "./ClientEmails/ClientEmails";
import ClientAddiInfo from "./ClientAddiInfo/ClientAddiInfo";
import { useStoreContext } from "../../store/ContextApiStore";

const ClientDetailsLayout = () => {
  const { allTabItems } = useStoreContext();

  if (allTabItems["project"]) {
    return <ClientProject />;
  } else if (allTabItems["invoice"]) {
    return <ClientInvoices />;
  } else if (allTabItems["note"]) {
    return <ClientNotes />;
  } else if (allTabItems["file"]) {
    return <ClientFiles />;
  } else if (allTabItems["email"]) {
    return <ClientEmails />;
  } else if (allTabItems["info"]) {
    return <ClientAddiInfo />;
  } else {
    return <ClientProject />;
  }
};

export default ClientDetailsLayout;
