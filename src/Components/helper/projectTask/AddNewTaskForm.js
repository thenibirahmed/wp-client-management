import React, { useRef, useState } from "react";

import { useForm } from "react-hook-form";

import TextField from "../TextField";
import { useStoreContext } from "../../../store/ContextApiStore";
import { SelectTextField } from "../SelectTextField";

const AddNewTaskForm = () => {
  const { setOpenProjectModal } = useStoreContext();
  const people = [
    { id: 1, name: "Client Name" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
  ];
  const currencyLists = [
    { id: 1, name: "Select Currency" },
    { id: 2, name: "USD" },
    { id: 3, name: "EUR" },
    { id: 4, name: "JPY" },
    { id: 5, name: "GBP" },
  ];
  const statusLists = [
    { id: 1, name: "Select Status" },
    { id: 2, name: "Active" },
    { id: 3, name: "Pending" },
    { id: 3, name: "Completed" },
  ];
  const priorityLists = [
    { id: 1, name: "Select Priority" },
    { id: 2, name: "Nomal" },
    { id: 3, name: "Medium" },
    { id: 3, name: "Hard" },
  ];
  const projectManagerLists = [
    { id: 1, name: "Select Project Manager" },
    { id: 2, name: "Scrum Master" },
    { id: 3, name: "Program Manager" },
  ];
  const assigneeLists = [
    { id: 1, name: "Select Assignee" },
    { id: 2, name: "Software Developer" },
    { id: 3, name: "UX Designer" },
  ];

  const [selectClientName, setSelectClientName] = useState(people[0]);
  const [selectCurrency, setSelectCurrency] = useState(currencyLists[0]);
  const [selectStatus, setSelectStatus] = useState(statusLists[0]);
  const [selectPriority, setSelectPriority] = useState(priorityLists[0]);
  const [selectProjectManager, setSelectProjectManager] = useState(
    projectManagerLists[0]
  );
  const [selectAssignee, setSelectAssignee] = useState(assigneeLists[0]);

  const imageRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
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
        <div>
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
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <SelectTextField
            label="Assignee"
            select={selectAssignee}
            setSelect={setSelectAssignee}
            lists={assigneeLists}
            isSubmitting={isSubmitting}
          />
          <SelectTextField
            label="Priority"
            select={selectPriority}
            setSelect={setSelectPriority}
            lists={priorityLists}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <SelectTextField
            label="Start Date"
            select={selectProjectManager}
            setSelect={setSelectProjectManager}
            lists={projectManagerLists}
            isSubmitting={isSubmitting}
          />
          <SelectTextField
            label="Due Date"
            select={selectAssignee}
            setSelect={setSelectAssignee}
            lists={assigneeLists}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="desc"
            className={`font-medium text-sm  font-metropolis text-textColor `}
          >
            Description
          </label>
          <textarea
            placeholder="Add project description..."
            rows={5}
            className={` py-2 px-4 rounded-[5px] border  w-full   outline-none bg-transparent  text-textColor2 text-sm font-metropolis ${
              errors["description"]?.message
                ? "border-customRed"
                : "border-borderColor"
            }`}
            {...register("description", {
              required: { value: true, message: "Description is required*" },
            })}
          />
          {errors["description"]?.message && (
            <p className="text-xs font-semibold text-customRed -mt-1">
              {errors["description"]?.message}
            </p>
          )}
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

export default AddNewTaskForm;
