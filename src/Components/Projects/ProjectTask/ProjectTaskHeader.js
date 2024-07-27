import React from "react";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  Task01Icon,
  UserAdd02Icon,
} from "../../../utils/icons";

import { useStoreContext } from "../../../store/ContextApiStore";
import Filter from "../../helper/Filter";
import { Search } from "../../helper/Search";

const ProjectTaskHeader = () => {
  const { openTask, setOpenTask } = useStoreContext();
  return (
    <div className="flex lg:flex-row  lg:justify-between flex-col lg:items-center lg:gap-0 gap-4">
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        Task
      </h1>
      <div className="flex sm:flex-row flex-wrap gap-5 items-center">
        <button>
          <Delete03Icon className="text-textColor2" />
        </button>
        <button>
          <CheckmarkCircle02Icon className="text-textColor2" />
        </button>
        <Filter />
        <Search />
        <button
          onClick={() => setOpenTask(true)}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-customBlue px-5 py-[10px] text-sm font-semibold text-white shadow-sm  hover:text-gray-200 "
        >
          <Task01Icon
            aria-hidden="true"
            className="text-white hover:text-gray-200 w-5 h-5"
          />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default ProjectTaskHeader;
