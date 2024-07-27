import React from "react";
import { useStoreContext } from "../../store/ContextApiStore";
import ProjectTask from "./ProjectTask/ProjectTask";
import ClientNotes from "../Clients/ClientNotes/ClientNotes";
import ClientFiles from "../Clients/ClientFiles/ClientFiles";
import ClientEmails from "../Clients/ClientEmails/ClientEmails";
import ClientAddiInfo from "../Clients/ClientAddiInfo/ClientAddiInfo";
import ProjectInvoice from "./ProjectInvoice/ProjectInvoice";

const ProjectDetailsLayout = () => {
  const { allTabItems } = useStoreContext();

  if (allTabItems["task"]) {
    return <ProjectTask />;
  } else if (allTabItems["invoice"]) {
    return <ProjectInvoice />;
  } else if (allTabItems["note"]) {
    return <ClientNotes />;
  } else if (allTabItems["file"]) {
    return <ClientFiles />;
  } else if (allTabItems["email"]) {
    return <ClientEmails />;
  } else if (allTabItems["info"]) {
    return <ClientAddiInfo />;
  } else {
    return <ProjectTask />;
  }
};

export default ProjectDetailsLayout;
