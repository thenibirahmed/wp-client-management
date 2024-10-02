import React, { useState } from "react";
import toast from "react-hot-toast";

import EmptyTable from "../../helper/EmptyTable";
import { useStoreContext } from "../../../store/ContextApiStore";
import NoteTable from "../../helper/notes/NoteTable";
import AddNewNote from "../../helper/notes/AddNewNote";
import { Task01Icon } from "../../../utils/icons";
import ProjectHeader from "../../helper/projects/ProjectHeader";
import { useBulkDelete, useFetchProjectNotes } from "../../../hooks/useQuery";
import useHashRouting from "../../../utils/useHashRouting";
import { useRefetch } from "../../../hooks/useRefetch";
import Skeleton from "../../Skeleton";
import Errors from "../../Errors";

const ClientNotes = ({ clientId }) => {
  const [loader, setLoader] = useState(false);

  const {
    createNote,
    setCreateNote,
    updateNotes,
    setUpdateNotes,
    setNoteId,
    noteId,
    dateFrom,
    dateTo,
    searchText,
    setSearchText,
  } = useStoreContext();

  const [selectedNote, setSelectedNote] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "note=1";

  const {
    isLoading,
    data: clientNotes,
    error,
    refetch,
  } = useFetchProjectNotes(
    clientId,
    searchText,
    dateFrom,
    dateTo,
    paginationUrl,
    "client",
    onError
  );

  useRefetch(paginationUrl, searchText, dateFrom, dateTo, null, null, refetch);

  const handler = () => {
    setCreateNote(true);
  };

  const onDeleteAction = async (ids) => {
    await useBulkDelete("/notes/bulk-delete", ids, refetch, setLoader, false);
    setSelectedNote([]);
  };

  const onCheckAction = (ids) => {};

  function onError(err) {
    console.log(err);
    toast.error(
      err?.response?.data?.message || "Failed To Fetch Project Notes"
    );
  }

  if (error) {
    console.log("project task error", error?.response?.data?.errors);
    return (
      <Errors
        message={
          error?.response?.data?.errors ||
          `Failed To Fetch Client Note Data for clientId ${clientId}`
        }
      />
    );
  }

  return (
    <React.Fragment>
      <ProjectHeader
        selectedProject={selectedNote}
        title="Notes"
        setOpenModal={updateNotes ? setUpdateNotes : setCreateNote}
        openModal={updateNotes ? updateNotes : createNote}
        btnTitle="Add Note"
        cancelTitle="Cancel"
        onDeleteAction={onDeleteAction}
        onCheckAction={onCheckAction}
        check={false}
        loader={loader}
        setSearchText={setSearchText}
        searchText={searchText}
      />

      {createNote || updateNotes ? (
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
            slug="clients"
            update={updateNotes}
            noteId={noteId}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {clientNotes?.notes?.length > 0 ? (
            <>
              {isLoading ? (
                <Skeleton />
              ) : (
                <NoteTable
                  noteData={clientNotes?.notes}
                  projectId={clientId}
                  pagination={clientNotes?.pagination}
                  selectedNote={selectedNote}
                  setSelectedNote={setSelectedNote}
                  isAllselected={isAllselected}
                  setIsAllSelected={setIsAllSelected}
                  setUpdateNotes={setUpdateNotes}
                  refetch={refetch}
                  slug="clients"
                  setNoteId={setNoteId}
                  noteId={noteId}
                />
              )}
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
