import React from "react";
import ClientNoteHeader from "./ClientNoteHeader";
import ClientNoteTable from "./ClientNoteTable";
import { Task01Icon } from "../../../utils/icons";
import EmptyTable from "../../helper/EmptyTable";
import { useStoreContext } from "../../../store/ContextApiStore";
import AddNewNote from "./AddNewNote";

const ClientNotes = () => {
  const { createNote, setCreateNote } = useStoreContext();

  const dataList = [1];

  const handler = () => {
    setCreateNote(true);
  };
  return (
    <React.Fragment>
      <ClientNoteHeader />

      {createNote ? (
        <React.Fragment>
          <AddNewNote />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {dataList.length > 0 ? (
            <>
              <ClientNoteTable />
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
