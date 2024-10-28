import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import EmailTable from "./EmailTable";
import useHashRouting from "../../../utils/useHashRouting";
import toast from "react-hot-toast";
import Loaders from "../../Loaders";
import api from "../../../api/api";
import dayjs from "dayjs";
import {
  Attachment02Icon,
  Image02Icon,
  Link05Icon,
  SignatureIcon,
} from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";

const AddNewEmail = ({
  emailsData,
  pagination,
  refetch,
  setOpen,
  projectId,
  slug,
}) => {
  return (
    <div>
      <div className="border border-borderColor rounded-[8px] py-[13px] ">
        <EmailBox
          refetch={refetch}
          setOpen={setOpen}
          slug={slug}
          id={projectId}
        />
      </div>
      <EmailTable
        emailsData={emailsData}
        pagination={pagination}
        projectId={projectId}
        slug={slug}
      />
    </div>
  );
};

export default AddNewEmail;

const EmailBox = ({ refetch, setOpen, slug, id }) => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");

  const { setIsFetching } = useStoreContext();
  const [editorContent, setEditorContent] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);
  const [subject, setSubject] = useState();
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const quillRef = useRef(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!id) return toast.error("Id is required");
    if (!editorContent) return toast.error("Email Body is required");

    setSubmitLoader(true);
    setIsFetching(true);
    const sendData = {
      subject: subject,
      body: editorContent,
      scheduled_at: dayjs(new Date()).format("YYYY-MM-DD"),
    };

    if (slug === "projects") {
      sendData.project_id = id;
    } else {
      sendData.client_id = id;
    }

    try {
      const { data } = await api.post("/email/create", sendData);
      toast.success(data?.message);
      await refetch();
      setOpen(false);
      setEditorContent("");
    } catch (err) {
      console.log(err);
      toast.error("Email Send Failed");
    } finally {
      setSubmitLoader(false);
      setIsFetching(false);
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
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", e.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const insertAttachment = (file) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    const attachmentUrl = URL.createObjectURL(file);
    const attachmentTag = `<a href="${attachmentUrl}" download="${file.name}">${file.name}</a>`;
    quill.clipboard.dangerouslyPasteHTML(range.index, attachmentTag);
  };

  const handleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.clipboard.dangerouslyPasteHTML(
        range.index,
        `<a href="${url}" target="_blank">${url}</a>`
      );
    }
  };

  const handleSignature = () => {
    const signature = "\n--\nYour Signature";
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    quill.clipboard.dangerouslyPasteHTML(range.index, signature);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="px-4">
        <input
          name="to"
          placeholder="To"
          type="text"
          className="w-full font-metropolis  px-1 py-1 outline-none text-textColor font-medium"
        />
        <input
          onChange={(e) => setSubject(e.target.value)}
          name="subject"
          placeholder="Subject"
          type="text"
          className="w-full text-textColor2 font-metropolis font-normal border-b border-t border-borderColor px-1 py-2 outline-none"
        />
      </div>

      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={setEditorContent}
        placeholder="write text here"
        className="w-full border-b h-48 border-b-borderColor font-metropolis font-normal text-textColor2 px-4 outline-none py-3"
        modules={{
          toolbar: false,
        }}
      />

      <div className="px-4 flex justify-between items-center pt-1">
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
          <button onClick={handleSignature}>
            <SignatureIcon className="text-textColor2" />
          </button>
        </div>
        <button
          disabled={submitLoader}
          type="submit"
          className="font-metropolis rounded-[5px] bg-customBlue text-white py-[10px] px-[12px] text-xs font-medium"
        >
          {submitLoader ? <Loaders /> : " Send Email"}
        </button>
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
