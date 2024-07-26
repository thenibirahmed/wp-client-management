import React from "react";

import { useStoreContext } from "../../store/ContextApiStore";
import ProjectInfo from "./ProjectInfo";
import ProjectOverView from "./ProjectOverView";
import ClientAddNewInvoice from "../Clients/ClientInvoices/AddNewInvoice/ClientAddNewInvoice";
import ProjectDetailsLayout from "./ProjectDetailsLayout";

const ProjectDetail = () => {
  const { createInvoice, setCreateInvoice } = useStoreContext();
  return (
    <React.Fragment>
      {!createInvoice ? (
        <React.Fragment>
          <ProjectInfo />
          <ProjectOverView />
          <div className="space-y-6">
            {/* <Tab /> */}
            <React.Fragment>
              <ProjectDetailsLayout />
            </React.Fragment>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ClientAddNewInvoice />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProjectDetail;
