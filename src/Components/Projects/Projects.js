import React, { useState, useEffect } from "react";

import EmptyTable from "../helper/EmptyTable";

import ProjectTable from "./ProjectTable";

import ProjectOverView from "./ProjectOverView";
import ProjectHeader from "./ProjectHeader";
import { UserCircle02Icon } from "../../utils/icons";
import { ProjectModal } from "../helper/ProjectModal";

const Projects = () => {
  const dataList = [1];

  return (
    <React.Fragment>
      <ProjectOverView />
      <div className="space-y-6">
        <ProjectHeader />

        <React.Fragment>
          {dataList.length > 0 ? (
            <>
              <ProjectTable />
            </>
          ) : (
            <>
              <EmptyTable
                Icon={UserCircle02Icon}
                setOpen={setOpen}
                title="  Clients Not Yet Registered"
                subtitle="Start building your client list."
                btnText=" Add Client"
              />
            </>
          )}
        </React.Fragment>
      </div>

      <ProjectModal />
    </React.Fragment>
  );
};

export default Projects;
