import React from "react";

import NoteTable from "./NoteTable";
import {
  Attachment02Icon,
  Image02Icon,
  Link05Icon,
} from "../../../utils/icons";

const AddNewNote = () => {
  return (
    <div>
      <div className="border border-borderColor rounded-[8px] py-[13px] ">
        <AddNewNoteTextArea />
      </div>
      <NoteTable />
    </div>
  );
};

export default AddNewNote;

const AddNewNoteTextArea = () => {
  return (
    <>
      <textarea
        placeholder="write text here"
        className="w-full border-b border-b-borderColor text-textColor2 px-4 outline-none"
        rows="5"
      ></textarea>

      <div className="px-4 flex justify-between items-center pt-1">
        <div className="flex gap-6">
          <button>
            <Attachment02Icon className="text-textColor2" />
          </button>
          <button>
            <Link05Icon className="text-textColor2" />
          </button>
          <button>
            <Image02Icon className="text-textColor2" />
          </button>
        </div>
        <button
          type="submit"
          className="font-metropolis rounded-[5px]  bg-customBlue text-white  py-[10px] px-[12px] text-xs font-medium"
        >
          Save Note
        </button>
      </div>
    </>
  );
};
