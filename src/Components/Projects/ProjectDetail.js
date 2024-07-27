import React from "react";

import { useStoreContext } from "../../store/ContextApiStore";
import ProjectInfo from "./ProjectInfo";
import ProjectOverView from "./ProjectOverView";

import ProjectDetailsLayout from "./ProjectDetailsLayout";
import Tab from "../helper/Tabs";
import AddNewInvoice from "../helper/invoices/addNewInvoice/AddNewInvoice";

const ProjectDetail = () => {
  const { createInvoice, setCreateInvoice } = useStoreContext();
  return (
    <React.Fragment>
      {!createInvoice ? (
        <React.Fragment>
          <ProjectInfo />
          <ProjectOverView />
          <div className="space-y-6">
            <Tab task={true} />
            <React.Fragment>
              <ProjectDetailsLayout />
            </React.Fragment>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <AddNewInvoice />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProjectDetail;
