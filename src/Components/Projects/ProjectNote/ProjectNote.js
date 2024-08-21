import React from "react";

import EmptyTable from "../../helper/EmptyTable";
import { useStoreContext } from "../../../store/ContextApiStore";

import NoteTable from "../../helper/notes/NoteTable";
import NoteHeader from "../../helper/notes/NoteHeader";
import AddNewNote from "../../helper/notes/AddNewNote";
import { Task01Icon } from "../../../utils/icons";

const ProjectNote = () => {
  const { createNote, setCreateNote } = useStoreContext();

  const dataList = [1];

  const handler = () => {
    setCreateNote(true);
  };
  return (
    <React.Fragment>
      <NoteHeader />

      {createNote ? (
        <React.Fragment>
          <AddNewNote />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {dataList.length > 0 ? (
            <>
              <NoteTable />
            </>
          ) : (
            <>
              <EmptyTable
                Icon={Task01Icon}
                handler={handler}
                title="Notes Not Yet Created"
                subtitle="Your first note is just a click away—create it now!"
                btnText="Add Note"
              />
            </>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProjectNote;
