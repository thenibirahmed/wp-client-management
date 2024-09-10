import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useStoreContext } from "../../../store/ContextApiStore";
import NoteTable from "./NoteTable";
import toast from "react-hot-toast";
import useHashRouting from "../../../utils/useHashRouting";
import Loaders from "../../Loaders";
import api from "../../../api/api";
import {
  Attachment02Icon,
  Image02Icon,
  Link05Icon,
} from "../../../utils/icons";

const AddNewNote = ({
  noteData,
  selectedNote,
  setSelectedNote,
  isAllselected,
  setIsAllSelected,
  refetch,
  setOpen,
}) => (
  <div>
    <div className="border border-borderColor rounded-[8px] py-[13px]">
      <AddNewNoteTextArea refetch={refetch} setOpen={setOpen} />
    </div>
    <NoteTable
      noteData={noteData}
      selectedNote={selectedNote}
      setSelectedNote={setSelectedNote}
      isAllselected={isAllselected}
      setIsAllSelected={setIsAllSelected}
    />
  </div>
);

export default AddNewNote;

const AddNewNoteTextArea = ({ refetch, setOpen }) => {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const { setCreateNote } = useStoreContext();
  const [editorContent, setEditorContent] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);

  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const quillRef = useRef(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!editorContent) return toast.error("Content required");
    const projectId = pathArray[1] ? Number(pathArray[1]) : null;

    if (!projectId) return toast.error("ProjectId is required");

    setSubmitLoader(true);
    const sendData = {
      project_id: projectId,
      note: editorContent,
    };

    try {
      const { data } = await api.post("/note/create", sendData);
      toast.success(data?.message);
      await refetch();
      setEditorContent("");
      setCreateNote(false);
      setOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Create new note failed");
    } finally {
      setSubmitLoader(false);
    }
  };

  const handleAttachment = () => {
    fileInputRef.current.click();
  };

  const handleImage = () => {
    imageInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      insertAttachment(file);
    });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        insertIntoEditor(`<img src="${e.target.result}" alt="${file.name}" />`);
      };
      reader.readAsDataURL(file);
    });
  };

  const insertAttachment = (file) => {
    const attachmentUrl = URL.createObjectURL(file);
    const attachmentTag = `<a href="${attachmentUrl}" download="${file.name}">${file.name}</a>`;
    insertIntoEditor(attachmentTag);
  };

  const handleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      const linkTag = `<a href="${url}" target="_blank">${url}</a>`;
      insertIntoEditor(linkTag);
    }
  };

  const insertIntoEditor = (html) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    quill.clipboard.dangerouslyPasteHTML(range.index, html);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={setEditorContent}
        modules={{
          toolbar: false,
        }}
        className="w-full  text-textColor2 px-4 outline-none font-metropolis  h-32 font-normal text-sm  "
        placeholder="Write text here"
      />

      <div className="px-4 flex justify-between items-center pt-4 ">
        <div className="flex gap-6">
          <button onClick={handleAttachment}>
            <Attachment02Icon className="text-textColor2" />
          </button>
          <button onClick={handleLink}>
            <Link05Icon className="text-textColor2" />
          </button>
          <button onClick={handleImage}>
            <Image02Icon className="text-textColor2" />
          </button>
        </div>
        <div>
          <button
            disabled={submitLoader}
            type="submit"
            className="font-metropolis rounded-[5px] bg-customBlue text-white py-[10px] px-[12px] text-xs font-medium"
          >
            {submitLoader ? <Loaders /> : "Save Note"}
          </button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />

      <input
        type="file"
        ref={imageInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
        multiple
      />
    </form>
  );
};
