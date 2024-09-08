import React, { useState } from "react";

import EmptyTable from "../../helper/EmptyTable";
import { useStoreContext } from "../../../store/ContextApiStore";
import NoteTable from "../../helper/notes/NoteTable";
import AddNewNote from "../../helper/notes/AddNewNote";
import { Task01Icon } from "../../../utils/icons";
import { useFetchProjectNotes } from "../../../hooks/useQuery";
import Errors from "../../Errors";
import toast from "react-hot-toast";
import Skeleton from "../../Skeleton";
import ProjectHeader from "../../helper/projects/ProjectHeader";

const ProjectNote = ({ projectId = { projectId } }) => {
  const { createNote, setCreateNote } = useStoreContext();

  const [selectedNote, setSelectedNote] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const {
    isLoading,
    data: projectNotes,
    error,
  } = useFetchProjectNotes(projectId, onError);

  function onError(err) {
    console.log(err);
    toast.error(
      err?.response?.data?.message || "Failed To Fetch Project Notes"
    );
  }

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
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              {" "}
              {projectNotes?.notes?.length > 0 ? (
                <>
                  <NoteTable
                    noteData={projectNotes?.notes}
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
            </>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProjectNote;
