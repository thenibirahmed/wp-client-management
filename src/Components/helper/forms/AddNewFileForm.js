import React, { useRef, useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import { useStoreContext } from "../../../store/ContextApiStore";
import { Image02Icon } from "../../../utils/icons";
import TextField from "../TextField";
import toast from "react-hot-toast";
import api from "../../../api/api";
import useHashRouting from "../../../utils/useHashRouting";

const AddNewFileForm = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const { setOpenFileModal } = useStoreContext();
  const [imageUrl, setImageUrl] = useState();
  const [submitLoader, setSubmitLoader] = useState(false);
  const imageRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const addNewFileHandler = async (data) => {
    const projectId = pathArray[1] ? Number(pathArray[1]) : null;

    if (!projectId) return toast.error("ProjectId is required");

    setSubmitLoader(true);
    const sendData = {
      project_id: projectId,
      title: data.title,
      url: data.url,
    };
    console.log(data);

    try {
      const { data } = await api.post("/file/create", sendData);
      toast.success(data?.message);
      reset();
    } catch (err) {
      console.log(err);
      toast.error("Create new file failed");
    } finally {
      setSubmitLoader(false);
    }
  };

  const onImageUploadHandler = () => {
    imageRef.current.click();
  };

  useEffect(() => {
    if (imageUrl) {
      reset();
    }
  }, [imageUrl]);

  return (
    <div className="py-5 relative h-full ">
      <form className="space-y-4 " onSubmit={handleSubmit(addNewFileHandler)}>
        <TextField
          label="Title"
          required={!imageUrl}
          id="title"
          type="text"
          message="*Title is required"
          placeholder="Title"
          register={register}
          errors={errors}
        />
        <TextField
          label="Add URL / Upload File"
          required={!imageUrl}
          id="url"
          type="url"
          message="*Url is required"
          placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486 "
          register={register}
          errors={errors}
        />

        <div className=" font-metropolis text-sm font-normal flex justify-center text-textColor2">
          or
        </div>

        <div className="flex  flex-col gap-2  w-full">
          <input
            onChange={(e) => setImageUrl(e.target.files[0])}
            ref={imageRef}
            type="file"
            className="hidden"
          />
          <button
            type="button"
            onClick={onImageUploadHandler}
            className="py-3 px-3 border border-customBlue text-customBlue flex justify-center items-center gap-2 font-metropolis text-xs font-medium rounded-[5px]"
          >
            <Image02Icon className="w-4 h-4 text-customBlue" />
            <span>Upload File</span>
          </button>
        </div>
        <div className="flex  w-full justify-between items-center absolute bottom-5">
          <button
            onClick={() => {
              setOpenFileModal(false);
              setImageUrl("");
            }}
            type="button"
            className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`font-metropolis rounded-[5px]  bg-customBlue text-white  py-[10px] px-4 text-sm font-medium`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewFileForm;
