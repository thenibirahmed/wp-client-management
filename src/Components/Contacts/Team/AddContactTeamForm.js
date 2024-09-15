import React, { useRef, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import TextField from "../../helper/TextField";
import api from "../../../api/api";
import toast from "react-hot-toast";
import Loaders from "../../Loaders";
import { useFetchSelectProjects } from "../../../hooks/useQuery";
import Errors from "../../Errors";
import Skeleton from "../../Skeleton";
import { MultiSelectTextField } from "../../helper/MultiSelectTextField";

const AddContactTeamForm = ({ setOpen, refetch }) => {
  const [imageUrl, setImageUrl] = useState("");
  const imageRef = useRef();

  const [submitLoader, setSubmitLoader] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);
  const [projectIds, setProjectIds] = useState([]);

  const {
    isLoading,
    data: projectLists,
    error,
  } = useFetchSelectProjects(onError);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const addNewContactTeamHandler = async (data) => {
    setSubmitLoader(true);
    if (projectIds.length === 0) return toast.error("Team member is required");
    const sendData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      designation: data.designation,
      projectIds: projectIds,
    };

    try {
      const { data } = await api.post("/team-member/create", sendData);
      toast.success(data?.message);
      await refetch();
      reset();
      setOpen(false);
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.errors["email"]?.length > 0) {
        setError("email", {
          message: err?.response?.data?.errors["email"][0],
        });
      }

      if (err?.response?.data?.errors["name"]?.length > 0) {
        setError("name", {
          message: err?.response?.data?.errors["name"][0],
        });
      }
    } finally {
      setSubmitLoader(false);
    }
  };

  const onImageUploadHandler = () => {
    imageRef.current.click();
  };

  function onError(err) {
    toast.error(err?.response?.data?.message);
    console.log(err);
  }
  console.log("s", projectIds);

  useEffect(() => {
    setProjectIds(selectedProject.map((item) => item.id));
  }, [selectedProject]);

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) return <Errors message="Internal Server Error" />;

  return (
    <div className="py-5 relative h-full ">
      <form
        className="space-y-4 "
        onSubmit={handleSubmit(addNewContactTeamHandler)}
      >
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="Name"
            required
            id="name"
            type="text"
            message="*This field is required"
            placeholder="Easin"
            register={register}
            errors={errors}
          />
          <TextField
            label="Designation"
            required
            id="designation"
            type="text"
            message="*This field is required"
            placeholder="Organization"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="Email"
            required
            id="email"
            type="email"
            message="*This field is required"
            placeholder="easin@gmail.com"
            register={register}
            errors={errors}
          />
          <TextField
            label="Phone"
            required
            id="phone"
            type="number"
            message="*This field is required"
            placeholder="Phone"
            register={register}
            errors={errors}
          />
        </div>
        <React.Fragment>
          <div className="w-full">
            <MultiSelectTextField
              label="Team Members"
              select={selectedProject}
              setSelect={setSelectedProject}
              lists={projectLists?.projects}
              isSubmitting={isSubmitting}
            />
          </div>
        </React.Fragment>

        <div className="flex  flex-col gap-2 md:w-1/2 w-full">
          <label
            className={"font-medium text-sm  font-metropolis text-textColor "}
          >
            Image
          </label>

          <input
            onChange={(e) => setImageUrl(e.target.files[0])}
            ref={imageRef}
            type="file"
            className="hidden"
            name="image"
            id="image"
          />
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
            disabled={submitLoader}
            onClick={() => setOpen(false)}
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
            {submitLoader ? <Loaders /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContactTeamForm;
