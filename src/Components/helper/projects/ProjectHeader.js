import React from "react";

import { useStoreContext } from "../../../store/ContextApiStore";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  Task01Icon,
  UserAdd02Icon,
} from "../../../utils/icons";
import { Search } from "../Search";
import Filter from "../Filter";

const ProjectHeader = ({ selectedProject, title, setOpenModal, btnTitle }) => {
  const onDeleteAction = (ids) => {
    alert(ids[0].id);
  };
  const onCheckAction = (ids) => {
    alert(ids[0].id);
  };

  const { setOpenProjectModal, allTabItems } = useStoreContext();
  return (
    <div className="flex lg:flex-row  lg:justify-between flex-col lg:items-center lg:gap-0 gap-4">
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        All Project
      </h1>
      <div className="flex sm:flex-row flex-wrap gap-5 items-center">
        {selectedProject.length > 0 && (
          <>
            <button onClick={() => onDeleteAction(selectedProject)}>
              <Delete03Icon className="text-textColor2" />
            </button>
            <button onClick={() => onCheckAction(selectedProject)}>
              <CheckmarkCircle02Icon className="text-textColor2" />
            </button>
          </>
        )}
        <Search />

        <Filter />
        <button
          onClick={() => setOpenProjectModal(true)}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-customBlue px-5 py-[10px] text-sm font-semibold text-white shadow-sm  hover:text-gray-200 "
        >
          <Task01Icon
            aria-hidden="true"
            className="text-white hover:text-gray-200 h-[16px] w-[16px]"
          />
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;
