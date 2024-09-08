import React, { useState } from "react";

import EmptyTable from "../../helper/EmptyTable";
import { useStoreContext } from "../../../store/ContextApiStore";
import NoteTable from "../../helper/notes/NoteTable";
import AddNewNote from "../../helper/notes/AddNewNote";
import { Task01Icon } from "../../../utils/icons";
import ProjectHeader from "../../helper/projects/ProjectHeader";

const ClientNotes = () => {
  const { createNote, setCreateNote } = useStoreContext();

  const [selectedNote, setSelectedNote] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const dataList = [1];

  const handler = () => {
    setCreateNote(true);
  };

  const onDeleteAction = (ids) => {
    alert(ids[0].id);
  };
  const onCheckAction = (ids) => {
    alert(ids[0].id);
  };

  return (
    <React.Fragment>
      <ProjectHeader
        selectedProject={selectedNote}
        title="Notes"
        setOpenModal={setCreateNote}
        btnTitle="Add Note"
        onDeleteAction={onDeleteAction}
        onCheckAction={onCheckAction}
      />

      {createNote ? (
        <React.Fragment>
          <AddNewNote />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {dataList.length > 0 ? (
            <>
              <NoteTable
                noteData={[]}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                isAllselected={isAllselected}
                setIsAllSelected={setIsAllSelected}
              />
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

export default ClientNotes;
