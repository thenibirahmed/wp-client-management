import React from "react";
import { useStoreContext } from "../../store/ContextApiStore";
import ProjectTask from "./ProjectTask/ProjectTask";

import ProjectInvoice from "./ProjectInvoice/ProjectInvoice";
import ProjectNote from "./ProjectNote/ProjectNote";
import ProjectFile from "./ProjectFile/ProjectFile";
import ProjectEmail from "./ProjectEmail/ProjectEmail";
import ProjectInfo from "./ProjectInfo/ProjectInfo";

const ProjectDetailsLayout = ({ projectId }) => {
  const { allTabItems } = useStoreContext();

  if (allTabItems["task"]) {
    return <ProjectTask projectId={projectId} />;
  } else if (allTabItems["invoice"]) {
    return <ProjectInvoice projectId={projectId} />;
  } else if (allTabItems["note"]) {
    return <ProjectNote projectId={projectId} />;
  } else if (allTabItems["file"]) {
    return <ProjectFile projectId={projectId} />;
  } else if (allTabItems["email"]) {
    return <ProjectEmail projectId={projectId} />;
  } else if (allTabItems["info"]) {
    return <ProjectInfo />;
  } else {
    return <ProjectTask />;
  }
};

export default ProjectDetailsLayout;
