import React from "react";
import { useStoreContext } from "../../store/ContextApiStore";
import ProjectTask from "./ProjectTask/ProjectTask";

import ProjectInvoice from "./ProjectInvoice/ProjectInvoice";
import ProjectNote from "./ProjectNote/ProjectNote";
import ProjectFile from "./ProjectFile/ProjectFile";
import ProjectEmail from "./ProjectEmail/ProjectEmail";
import ProjectInfo from "./ProjectInfo/ProjectInfo";

const ProjectDetailsLayout = () => {
  const { allTabItems } = useStoreContext();

  if (allTabItems["task"]) {
    return <ProjectTask />;
  } else if (allTabItems["invoice"]) {
    return <ProjectInvoice />;
  } else if (allTabItems["note"]) {
    return <ProjectNote />;
  } else if (allTabItems["file"]) {
    return <ProjectFile />;
  } else if (allTabItems["email"]) {
    return <ProjectEmail />;
  } else if (allTabItems["info"]) {
    return <ProjectInfo />;
  } else {
    return <ProjectTask />;
  }
};

export default ProjectDetailsLayout;
