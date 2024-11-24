import React from "react";
import ProjectListTable from "./ProjectListTable";
import { ArrowRight02Icon } from "../../utils/icons";

const ProjectList = ({ projects }) => {
  return (
    <div className=" border  border-borderColor rounded-[8px] lg:p-[32px] p-5">
      <div className="flex justify-between">
        <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
          Project List
        </h1>
        <button className="flex items-center gap-2">
          <a
            href="#/clients"
            className="font-metropolis uppercase text-sm font-semibold text-customBlue"
          >
            View all
          </a>
          <ArrowRight02Icon className="text-customBlue" />
        </button>
      </div>

      <div className="mt-6">
        <ProjectListTable projectData={projects} />
      </div>
    </div>
  );
};

export default ProjectList;
