import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TextField from "../TextField";
import { useStoreContext } from "../../../store/ContextApiStore";
import { SelectTextField } from "../SelectTextField";
import {
  useFetchAllClients,
  useFetchAllPriorities,
} from "../../../hooks/useQuery";
import Skeleton from "../../Skeleton";
import api from "../../../api/api";
import { Calendar02Icon } from "../../../utils/icons";

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

const AddNewProjectForm = () => {
  const datePickerStartRef = useRef(null);
  const datePickerDueRef = useRef(null);
  const { setOpenProjectModal } = useStoreContext();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [selectClient, setSelectClient] = useState();
  const [selectCurrency, setSelectCurrency] = useState(currencyLists[0]);
  const [selectStatus, setSelectStatus] = useState(statusLists[0]);
  const [selectPriority, setSelectPriority] = useState();
  const [selectProjectManager, setSelectProjectManager] = useState(
    projectManagerLists[0]
  );
  const [selectAssignee, setSelectAssignee] = useState(assigneeLists[0]);
  const [submitLoader, setSubmitLoader] = useState(false);

  const imageRef = useRef();

  //calling react-query Parallely for fetching data
  const { isLoading: isLoadingClients, data: clients } = useFetchAllClients(
    onError,
    onSuccessClients
  );
  const { isLoading: isLoadingPriorities, data: priorities } =
    useFetchAllPriorities(onError, onSuccessPriorities);

  const isLoading = isLoadingClients || isLoadingPriorities;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const addNewClientHandler = async (data) => {
    setSubmitLoader(true);
    const sendData = {
      client_id: Number(selectClient.id), // must be integer
      manager_id: "1", // must be integer
      status_id: "2", //must be integer
      priority_id: Number(selectPriority.id), //must be integer
      title: data.title,
      budget: 450.2, // decimal
      currency: "USD",
      start_date: startDate, // time format
      due_date: endDate, //time format
      description: data.description,
    };
    console.log(sendData);
    // try {
    //   const { data } = await api.post("/project/create", sendData);
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   setSubmitLoader(false);
    // }

    //reset();
  };

  const onImageUploadHandler = () => {
    imageRef.current.click();
  };

  function onSuccessClients(data) {
    setSelectClient(data?.clients[0]);
  }
  function onSuccessPriorities(data) {
    setSelectPriority(data?.priorities[0]);
  }

  function onError(err) {
    toast.error(err?.response?.data?.message);
    console.log(err);
  }

  if (isLoading) {
    return <Skeleton />;
  }

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
            label="Client Name"
            select={selectClient}
            setSelect={setSelectClient}
            lists={clients?.clients}
            isSubmitting={isSubmitting}
          />

          <SelectTextField
            label="Project Manager"
            select={selectProjectManager}
            setSelect={setSelectProjectManager}
            lists={projectManagerLists}
            isSubmitting={isSubmitting}
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
            label="Currency"
            select={selectCurrency}
            setSelect={setSelectCurrency}
            lists={currencyLists}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <SelectTextField
            label="Status"
            select={selectStatus}
            setSelect={setSelectStatus}
            lists={statusLists}
            isSubmitting={isSubmitting}
          />
          <SelectTextField
            label="Priority"
            select={selectPriority}
            setSelect={setSelectPriority}
            lists={priorities?.priorities}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-sm  font-metropolis text-textColor">
              Start Date
            </label>
            <div
              className={`relative text-sm font-metropolis border w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-textColor2   sm:text-sm sm:leading-6 `}
            >
              <DatePicker
                ref={datePickerStartRef}
                className="font-metropolis text-sm text-textColor w-full outline-none"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />

              <button
                type="button"
                onClick={() => datePickerStartRef.current.setFocus()}
                className="absolute right-0 top-0 bottom-0 m-auto"
              >
                <Calendar02Icon />
              </button>
            </div>
          </div>{" "}
          <div className="flex flex-col gap-2 w-full   ">
            <label className="font-medium text-sm  font-metropolis text-textColor">
              Due Date
            </label>
            <div
              className={`relative text-sm font-metropolis border w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-textColor2   sm:text-sm sm:leading-6 `}
            >
              <DatePicker
                ref={datePickerDueRef}
                className="font-metropolis text-sm text-textColor w-full outline-none"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
              <button
                type="button"
                onClick={() => datePickerDueRef.current.setFocus()}
                className="absolute right-0 top-0 bottom-0 m-auto"
              >
                <Calendar02Icon />
              </button>
            </div>
          </div>
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

export default AddNewProjectForm;
