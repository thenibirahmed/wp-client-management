import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useStoreContext } from "../../../store/ContextApiStore";
import { Image02Icon } from "../../../utils/icons";
import TextField from "../TextField";
import toast from "react-hot-toast";
import api from "../../../api/api";
import Loaders from "../../Loaders";
import { useFetchFileEditDetails } from "../../../hooks/useQuery";
import { useUpdateDefaultFileValue } from "../../../hooks/useRefetch";
import Skeleton from "../../Skeleton";
import { wpImageUploader } from "../../../utils/wpImageUploader";

const AddNewFileForm = ({ refetch, setOpen, type, id, update = false }) => {
  const { setOpenFileModal, setIsFetching } = useStoreContext();
  const [imageUrl, setImageUrl] = useState(null);
  const [submitLoader, setSubmitLoader] = useState(false);
  const imageRef = useRef();

  const {
    isLoading: fileLoader,
    data: clientFile,
    error,
  } = useFetchFileEditDetails(id, update, onError);

  function onError(err) {
    toast.error(
      err?.response?.data?.message?.errors || "Failed to fetch file data"
    );
    console.log(err);
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { client_id: "", project_id: "" },
    mode: "onTouched",
  });

  //custom hook for updating default value in the form to edit
  useUpdateDefaultFileValue(update, clientFile, setValue, "client");

  const addNewFileHandler = async (data) => {
    setSubmitLoader(true);
    setIsFetching(true);
    const sendData = {
      title: data.title,
      url: data.url,
    };

    if (update) {
      if (type === "project") {
        sendData.project_id = clientFile.project_id;
      } else {
        sendData.client_id = clientFile.client_id;
      }
    } else {
      if (type === "project") {
        sendData.project_id = id;
      } else {
        sendData.client_id = id;
      }
    }

    try {
      let res;
      if (update) {
        let { data: res } = await api.put(`/file/update/${id}`, sendData);
        res = data;
      } else {
        let { data: res } = await api.post("/file/create", sendData);
        res = data;
      }

      toast.success(res?.message || "operation success");
      await refetch();
      setOpen(false);
      reset();
    } catch (err) {
      console.log(err);
      toast.error("Create new file failed");
    } finally {
      setSubmitLoader(false);
      setIsFetching(false);
    }
  };

  const onImageUploadHandler = () => {
    wpImageUploader(setImageUrl);
  };

  useEffect(() => {
    if (imageUrl) {
      setValue("url", imageUrl);
    }
  }, [imageUrl]);

  if (fileLoader) return <Skeleton />;
  return (
    <div className="py-5 relative h-full ">
      <form className="space-y-4 " onSubmit={handleSubmit(addNewFileHandler)}>
        <TextField
          label="Title"
          required
          id="title"
          type="text"
          message="*Title is required"
          placeholder="Title"
          register={register}
          errors={errors}
        />
        <TextField
          label="Add URL / Upload File"
          required
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
          <input ref={imageRef} type="file" className="hidden" />
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
              setOpen(false);
              setImageUrl("");
            }}
            type="button"
            className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
          >
            Cancel
          </button>
          <button
            disabled={submitLoader}
            type="submit"
            className={`font-metropolis rounded-[5px]  bg-customBlue text-white  py-[10px] px-4 text-sm font-medium`}
          >
            {submitLoader ? <Loaders /> : <> {update ? "Update" : "Save"}</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewFileForm;
