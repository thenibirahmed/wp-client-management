import React from "react";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  MultiplicationSignIcon,
  NoteAddIcon,
  UserAdd02Icon,
} from "../../../utils/icons";

import { useStoreContext } from "../../../store/ContextApiStore";
import { ClientNoteSearch } from "./ClientNoteSearch";

const ClientNoteHeader = () => {
  const { setCreateNote, createNote } = useStoreContext();
  return (
    <div className="flex lg:flex-row  lg:justify-between flex-col lg:items-center lg:gap-0 gap-4">
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        Notes
      </h1>
      <div className="flex sm:flex-row flex-wrap gap-5 items-center">
        <button>
          <Delete03Icon className="text-textColor2" />
        </button>

        <ClientNoteSearch />
        {createNote ? (
          <>
            <button
              onClick={() => setCreateNote(false)}
              type="button"
              className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[8px] px-4 text-sm font- flex items-center gap-[5px]`}
            >
              <MultiplicationSignIcon className="text-textColor2" />
              <span className="mt-[1px]">Cancel</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setCreateNote(true)}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-customBlue px-5 py-[11px] text-sm font-semibold text-white shadow-sm  hover:text-gray-200 "
          >
            <NoteAddIcon
              aria-hidden="true"
              className="text-white hover:text-gray-200 w-4 h-4"
            />
            Add Note
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientNoteHeader;
