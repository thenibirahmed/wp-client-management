import React, { useRef, useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import { useStoreContext } from "../../../store/ContextApiStore";
import { Image02Icon } from "../../../utils/icons";
import TextField from "../TextField";

const AddNewFileForm = () => {
  const { setOpenFileModal } = useStoreContext();
  const [imageUrl, setImageUrl] = useState();
  const imageRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const addNewClientHandler = (data) => {
    console.log(data);
    reset();
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
      <form className="space-y-4 " onSubmit={handleSubmit(addNewClientHandler)}>
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
          id="ul"
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
