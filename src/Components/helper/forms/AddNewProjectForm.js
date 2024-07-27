import React, { useRef } from "react";

import { useForm } from "react-hook-form";

import TextField from "../TextField";
import { useStoreContext } from "../../../store/ContextApiStore";

const AddNewProjectForm = () => {
  const { setOpenProjectModal } = useStoreContext;
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

  return (
    <div className="py-5 relative h-full ">
      <form className="space-y-4 " onSubmit={handleSubmit(addNewClientHandler)}>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="Project Title"
            required
            id="title"
            type="text"
            message="This field is required*"
            placeholder="Project Title"
            register={register}
            errors={errors}
          />
          <TextField
            label="Client Name"
            required
            id="clientname"
            type="text"
            message="This field is required*"
            placeholder="Client Name"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="Budget"
            required
            id="budget"
            type="number"
            message="This field is required*"
            placeholder="$00.00"
            register={register}
            errors={errors}
          />
          <TextField
            label="Phone"
            required
            id="phone"
            type="number"
            message="*Phone Number is required"
            placeholder="Phone"
            register={register}
            errors={errors}
          />
        </div>

        <TextField
          label="Address"
          required
          id="address"
          type="text"
          message="*Address is required"
          placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486 "
          register={register}
          errors={errors}
        />
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="City"
            required
            id="city"
            type="text"
            message="*City is required"
            placeholder="New York"
            register={register}
            errors={errors}
          />{" "}
          <TextField
            label="ZIP Code"
            required
            id="zipcode"
            type="number"
            message="*ZIP Code is required"
            placeholder="1254"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="Country"
            required
            id="country"
            type="text"
            message="*Country is required"
            placeholder="USA"
            register={register}
            errors={errors}
          />
          <TextField
            label="State / Region / Province "
            required
            id="state"
            type="text"
            message="*State is required"
            placeholder="New Yorker"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex  flex-col gap-2 md:w-1/2 w-full">
          <label
            className={"font-medium text-sm  font-metropolis text-textColor "}
          >
            Image
          </label>

          <input ref={imageRef} type="file" className="hidden" />
          <button
            type="button"
            onClick={onImageUploadHandler}
            className="py-2 px-3 border border-customBlue text-customBlue flex justify-center gap-2 font-metropolis text-xs font-medium rounded-[5px]"
          >
            <span>Upload Image</span>
          </button>
        </div>
        <div className="flex  w-full justify-between items-center absolute bottom-5">
          <button
            onClick={() => setOpenProjectModal(false)}
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

export default AddNewProjectForm;