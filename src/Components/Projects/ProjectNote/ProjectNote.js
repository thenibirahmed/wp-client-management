import React, { useState } from "react";

import EmptyTable from "../../helper/EmptyTable";
import { useStoreContext } from "../../../store/ContextApiStore";
import NoteTable from "../../helper/notes/NoteTable";
import AddNewNote from "../../helper/notes/AddNewNote";
import { Task01Icon } from "../../../utils/icons";
import Errors from "../../Errors";
import toast from "react-hot-toast";
import Skeleton from "../../Skeleton";
import ProjectHeader from "../../helper/projects/ProjectHeader";
import useHashRouting from "../../../utils/useHashRouting";
import { useBulkDelete, useFetchProjectNotes } from "../../../hooks/useQuery";
import { useRefetch } from "../../../hooks/useRefetch";

const ProjectNote = ({ projectId }) => {
  const [loader, setLoader] = useState(false);
  const {
    createNote,
    setCreateNote,
    setUpdateNotes,
    updateNotes,
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
    data: projectNotes,
    error,
    refetch,
  } = useFetchProjectNotes(
    projectId,
    searchText,
    dateFrom,
    dateTo,
    paginationUrl,
    "project",
    onError
  );

  useRefetch(paginationUrl, searchText, dateFrom, dateTo, null, null, refetch);

  function onError(err) {
    console.log(err);
    toast.error(
      err?.response?.data?.message || "Failed To Fetch Project Notes"
    );
  }

  const handler = () => {
    setCreateNote(true);
  };

  const onDeleteAction = async (ids) => {
    useBulkDelete("/notes/bulk-delete", ids, refetch, setLoader, false);
  };
  const onCheckAction = (ids) => {};

  if (error) {
    return (
      <Errors
        message={
          error?.response?.data?.errors ||
          `Failed To Fetch Project Notes for projectId ${projectId}`
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
        setSearchText={setSearchText}
        searchText={searchText}
        check={false}
        loader={loader}
      />

      {createNote || updateNotes ? (
        <React.Fragment>
          <AddNewNote
            noteData={projectNotes?.notes}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            isAllselected={isAllselected}
            setIsAllSelected={setIsAllSelected}
            refetch={refetch}
            setOpen={setCreateNote}
            projectId={projectId}
            pagination={projectNotes?.pagination}
            type="project"
            slug="projects"
            update={updateNotes}
            noteId={noteId}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              {" "}
              {projectNotes?.notes?.length > 0 ? (
                <>
                  <NoteTable
                    noteData={projectNotes?.notes}
                    projectId={projectId}
                    pagination={projectNotes?.pagination}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    isAllselected={isAllselected}
                    setIsAllSelected={setIsAllSelected}
                    setUpdateNotes={setUpdateNotes}
                    slug="projects"
                    refetch={refetch}
                    setNoteId={setNoteId}
                    noteId={noteId}
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
            </>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProjectNote;
