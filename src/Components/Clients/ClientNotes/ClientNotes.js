import React, { useState } from "react";

import EmptyTable from "../../helper/EmptyTable";
import { useStoreContext } from "../../../store/ContextApiStore";
import NoteTable from "../../helper/notes/NoteTable";
import AddNewNote from "../../helper/notes/AddNewNote";
import { Task01Icon } from "../../../utils/icons";
import ProjectHeader from "../../helper/projects/ProjectHeader";
import { useFetchProjectNotes } from "../../../hooks/useQuery";
import useHashRouting from "../../../utils/useHashRouting";

const ClientNotes = ({ clientId }) => {
  const { createNote, setCreateNote } = useStoreContext();

  const [selectedNote, setSelectedNote] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const dataList = [1];

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "note=1";

  const {
    isLoading,
    data: clientNotes,
    error,
    refetch,
  } = useFetchProjectNotes(clientId, paginationUrl, "client", onError);

  function onError(err) {
    console.log(err);
    toast.error(
      err?.response?.data?.message || "Failed To Fetch Project Notes"
    );
  }

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
          <AddNewNote
            noteData={clientNotes?.notes}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            isAllselected={isAllselected}
            setIsAllSelected={setIsAllSelected}
            refetch={refetch}
            setOpen={setCreateNote}
            projectId={clientId}
            pagination={clientNotes?.pagination}
            type="client"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {dataList.length > 0 ? (
            <>
              <NoteTable
                noteData={clientNotes?.notes}
                projectId={clientId}
                pagination={clientNotes?.pagination}
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
