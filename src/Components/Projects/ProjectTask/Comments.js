import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  Attachment02Icon,
  Image02Icon,
  Link05Icon,
} from "../../../utils/icons";
import CommentLists from "./CommentLists";
import { useStoreContext } from "../../../store/ContextApiStore";
import toast from "react-hot-toast";
import Loaders from "../../Loaders";
import api from "../../../api/api";

const Comments = ({ comments, refetch }) => {
  console.log("all comments", comments);

  return (
    <div>
      <h1 className="font-metropolis text-textColor font-semibold sm:text-2xl text-xl  leading-10 mb-5 ">
        All Comments <span className="font-normal">({comments?.length})</span>
      </h1>
      <div className="border border-borderColor rounded-[8px] py-[13px]">
        <CommentBox refetch={refetch} />
      </div>
      <CommentLists commentlists={comments} />
    </div>
  );
};

export default Comments;

const CommentBox = ({ refetch }) => {
  const { commentReplyId, setCommentReplyId, taskId } = useStoreContext();

  const [submitLoader, setSubmitLoader] = useState(false);

  const [editorContent, setEditorContent] = useState("");
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const addNewCommentHandler = async (event) => {
    event.preventDefault();
    setSubmitLoader(true);

    const sendData = {
      task_id: taskId,
      comment: editorContent,
    };

    if (commentReplyId) {
      sendData.reply_to = commentReplyId;
    }

    try {
      const { data } = await api.post("/add-comment", sendData);

      setEditorContent("");
      await refetch();
      toast.success(data?.message || "Comment Added Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitLoader(false);
      setCommentReplyId("");
    }
  };

  const handleAttachment = () => {
    fileInputRef.current.click(); // Trigger hidden file input for attachments
  };

  const handleImage = () => {
    imageInputRef.current.click(); // Trigger hidden file input for images
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

  const quillRef = useRef(null);

  return (
    <form onSubmit={addNewCommentHandler}>
      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={setEditorContent}
        modules={{
          toolbar: false,
        }}
        className="w-full  text-textColor2 px-4 outline-none font-metropolis  font-normal text-sm h-32  "
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
        <button
          disabled={submitLoader}
          type="submit"
          className="font-metropolis rounded-[5px] bg-customBlue text-white py-[10px] px-[12px] text-xs font-medium"
        >
          {submitLoader ? (
            <Loaders />
          ) : commentReplyId ? (
            "Add Reply"
          ) : (
            "Add Comment"
          )}
        </button>
      </div>

      {/* Hidden file input for attachments */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />

      {/* Hidden file input for images */}
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
