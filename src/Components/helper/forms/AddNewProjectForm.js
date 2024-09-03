import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import TextField from "../TextField";
import { useStoreContext } from "../../../store/ContextApiStore";
import { SelectTextField } from "../SelectTextField";
import {
  useFetchProjectClients,
  useFetchProjectPriorities,
  useFetchProjectManager,
  useFetchProjectStatus,
} from "../../../hooks/useQuery";
import Skeleton from "../../Skeleton";
import api from "../../../api/api";
import { Calendar02Icon } from "../../../utils/icons";
import toast from "react-hot-toast";
import Loaders from "../../Loaders";
import Errors from "../../Errors";

const currencyLists = [
  { id: 2, name: "USD" },
  { id: 3, name: "EUR" },
  { id: 4, name: "JPY" },
  { id: 5, name: "GBP" },
];

const assigneeLists = [
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
  const [selectStatus, setSelectStatus] = useState();
  const [selectPriority, setSelectPriority] = useState();
  const [selectProjectManager, setSelectProjectManager] = useState();
  const [selectAssignee, setSelectAssignee] = useState(assigneeLists[0]);
  const [submitLoader, setSubmitLoader] = useState(false);

  const imageRef = useRef();

  //calling react-query Parallely for fetching data
  const {
    isLoading: isLoadingClients,
    data: clients,
    error: pClientErr,
  } = useFetchProjectClients(onError);

  const {
    isLoading: isLoadProjectManager,
    data: managers,
    error: pManagerErr,
  } = useFetchProjectManager(onError);
  console.log("maneger", managers);

  const {
    isLoading: isLoadingPriorities,
    data: priorities,
    error: pPrioritiesErr,
  } = useFetchProjectPriorities(onError);
  console.log("priorities", priorities);
  const {
    isLoading: isLoadingStatus,
    data: statuses,
    error: pStatusErr,
  } = useFetchProjectStatus(onError);
  console.log("statuses", statuses);
  const isLoading =
    isLoadingClients ||
    isLoadingPriorities ||
    isLoadProjectManager ||
    isLoadingStatus;

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
    if (
      !selectClient?.id ||
      !selectProjectManager?.id ||
      !selectStatus?.id ||
      !selectPriority?.id
    ) {
      return setError("This field is required*");
    }
    setSubmitLoader(true);
    const sendData = {
      client_id: selectClient?.id,
      manager_id: selectProjectManager?.id,
      status_id: selectStatus?.id,
      priority_id: selectPriority?.id,
      title: data.title,
      budget: 450.2,
      currency: "USD",
      start_date: dayjs(startDate).format("YYYY-MM-DD"),
      due_date: dayjs(endDate).format("YYYY-MM-DD"),
      description: data?.description,
    };
    console.log(sendData);
    try {
      const { data } = await api.post("/project/create", sendData);
      toast.success(data?.message);
      reset();
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitLoader(false);
    }
  };

  const onImageUploadHandler = () => {
    imageRef.current.click();
  };

  useEffect(() => {
    if (clients?.clients.length > 0) {
      setSelectClient(clients?.clients[0]);
    } else {
      setSelectClient({ name: " -No Client- ", id: null });
    }
    if (managers?.managers.length > 0) {
      setSelectProjectManager(managers?.managers[0]);
    } else {
      setSelectProjectManager({ name: " -No Project Manager- ", id: null });
    }
    if (priorities?.priorities.length > 0) {
      setSelectPriority(priorities?.priorities[0]);
    } else {
      setSelectPriority({ name: " -No Priority- ", id: null });
    }
    if (statuses?.statuses.length > 0) {
      setSelectStatus(statuses?.statuses[0]);
    } else {
      setSelectStatus({ name: " -No Status- ", id: null });
    }
  }, [clients, managers, priorities, statuses]);

  function onError(err) {
    toast.error(err?.response?.data?.message);
    console.log(err);
  }

  if (isLoading) {
    return <Skeleton />;
  }

  if (pClientErr || pManagerErr || pPrioritiesErr || pStatusErr)
    return <Errors message="Internal Server Error" />;

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
            lists={managers?.managers}
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
            lists={statuses?.statuses}
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
            disabled={submitLoader}
            onClick={() => setOpenProjectModal(false)}
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

export default AddNewProjectForm;
