import React from "react";
import ProjectListTable from "./ProjectListTable";
import { ArrowRight02Icon } from "../../utils/icons";
const dummyProjectData = [
  {
    projectname: "E-Commerce Website",
    task: "Develop product listing page",
    createdat: "2024-10-10",
    client: "ABC Corp",
    status: "In Progress",
  },
  {
    projectname: "Mobile App Development",
    task: "Implement push notifications",
    createdat: "2024-09-15",
    client: "XYZ Solutions",
    status: "Completed",
  },
  {
    projectname: "CRM System",
    task: "Fix user authentication bugs",
    createdat: "2024-08-30",
    client: "Global Enterprises",
    status: "Pending",
  },
  {
    projectname: "Portfolio Website",
    task: "Design homepage layout",
    createdat: "2024-10-05",
    client: "John Doe",
    status: "In Progress",
  },
  {
    projectname: "API Development",
    task: "Build RESTful API for blog",
    createdat: "2024-09-20",
    client: "TechWorld Inc.",
    status: "Completed",
  },
];

const ProjectList = () => {
  return (
    <div className=" border  border-borderColor rounded-[8px] p-[32px]">
      <div className="flex justify-between">
        <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
          Project List
        </h1>
        <button className="flex items-center gap-2">
          <span className="font-metropolis uppercase text-sm font-semibold text-customBlue">
            View all
          </span>
          <ArrowRight02Icon className="text-customBlue" />
        </button>
      </div>
      <div className="mt-6">
        <ProjectListTable projectData={dummyProjectData} />
      </div>
    </div>
  );
};

export default ProjectList;
