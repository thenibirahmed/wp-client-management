import React from "react";

import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  Task01Icon,
} from "../../../utils/icons";
import { Search } from "../Search";
import Filter from "../Filter";
import { useStoreContext } from "../../../store/ContextApiStore";
import { ClientSearchInput } from "../../Clients/SearchInput";

const ProjectHeader = ({
  selectedProject,
  title,
  setOpenModal,
  openModal,
  btnTitle,
  cancelTitle,
  onDeleteAction,
  onCheckAction,
  filter = false,
  check = true,
  setSearchText,
  searchText,
}) => {
  const { updateNotes, setUpdateNotes } = useStoreContext();
  return (
    <div className="flex lg:flex-row  lg:justify-between flex-col lg:items-center lg:gap-0 gap-4">
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        {title}
      </h1>
      <div className="flex sm:flex-row flex-wrap gap-5 items-center">
        {selectedProject?.length > 0 && (
          <>
            <button onClick={() => onDeleteAction(selectedProject)}>
              <Delete03Icon className="text-textColor2" />
            </button>
            {check && (
              <button onClick={() => onCheckAction(selectedProject)}>
                <CheckmarkCircle02Icon className="text-textColor2" />
              </button>
            )}
          </>
        )}
        <ClientSearchInput
          setSearchText={setSearchText}
          searchText={searchText}
        />
        {filter && <Filter />}

        {openModal ? (
          <>
            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
            >
              {cancelTitle}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setOpenModal(true);
                setUpdateNotes(false);
              }}
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-customBlue px-5 py-[11px] text-sm font-semibold text-white shadow-sm  hover:text-gray-200 "
            >
              <Task01Icon
                aria-hidden="true"
                className="text-white hover:text-gray-200 h-[16px] w-[16px]"
              />
              {btnTitle}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectHeader;
