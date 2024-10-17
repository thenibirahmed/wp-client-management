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
  useFetchPriorities,
  useFetchStatus,
  useFetchAssignee,
  useFetchSelectCurrency,
  useFetchProjectEditDetails,
} from "../../../hooks/useQuery";
import Skeleton from "../../Skeleton";
import api from "../../../api/api";
import { Calendar02Icon } from "../../../utils/icons";
import toast from "react-hot-toast";
import Loaders from "../../Loaders";
import Errors from "../../Errors";
import { MultiSelectTextField } from "../MultiSelectTextField";
import { useUpdateDefaultProjectValue } from "../../../hooks/useRefetch";

const AddNewProjectForm = ({ refetch, setOpen, update = false, projectId }) => {
  const datePickerStartRef = useRef(null);
  const datePickerDueRef = useRef(null);
  const imageRef = useRef();
  const { setOpenProjectModal, setOpenProjectUpdateModal, setIsFetching } =
    useStoreContext();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectClient, setSelectClient] = useState();
  const [selectCurrency, setSelectCurrency] = useState();
  const [selectStatus, setSelectStatus] = useState();
  const [selectPriority, setSelectPriority] = useState();
  const [selectProjectManager, setSelectProjectManager] = useState();
  const [assigneeLists, setAssigneeLists] = useState();
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [allIds, setAllIds] = useState([]);
  const [submitLoader, setSubmitLoader] = useState(false);

  const {
    isLoading: loader,
    data: clientProjects,
    error,
  } = useFetchProjectEditDetails(projectId, update, "project", onError);

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
  } = useFetchAssignee(onError);

  const {
    isLoading: isLoadingPriorities,
    data: priorities,
    error: pPrioritiesErr,
  } = useFetchPriorities("project", onError);

  const {
    isLoading: isLoadingStatus,
    data: statuses,
    error: pStatusErr,
  } = useFetchStatus("project", onError);

  const {
    isLoading: isLoadingSelectCurrency,
    data: currencyLists,
    error: selecturrencyErr,
  } = useFetchSelectCurrency(onError);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  //set default value for updating the project
  useUpdateDefaultProjectValue(
    update,
    clientProjects,
    setValue,
    setStartDate,
    setEndDate,
    "project"
  );

  const addNewProjectHandler = async (data) => {
    if (
      !selectClient?.id ||
      !selectProjectManager?.id ||
      !selectStatus?.id ||
      !selectPriority?.id ||
      !selectCurrency?.id
    ) {
      return setError("This field is required*");
    }

    setSubmitLoader(true);

    const sendData = {
      title: data.title,
      manager_id: selectProjectManager?.id,
      client_id: selectClient?.id,
      status_id: selectStatus?.id,
      priority_id: selectPriority?.id,
      budget: data.budget,
      assignee_ids: allIds,
      currency_id: selectCurrency?.id,
      start_date: dayjs(startDate).format("YYYY-MM-DD"),
      due_date: dayjs(endDate).format("YYYY-MM-DD"),
      description: data?.description,
    };

    try {
      let res;
      if (update) {
        let { data } = await api.put(`/project/update/${projectId}`, sendData);
        res = data;
      } else {
        let { data } = await api.post("/project/create", sendData);
        res = data;
      }

      toast.success(res?.message || "operation success");
      setIsFetching(true);
      await refetch();
      reset();
      setOpen(false);
      setOpenProjectUpdateModal(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitLoader(false);
      setIsFetching(false);
    }
  };

  const onImageUploadHandler = () => {
    imageRef.current.click();
  };

  useEffect(() => {
    setAllIds(selectedAssignees.map((item) => item.id));
  }, [selectedAssignees]);

  useEffect(() => {
    if (clients?.clients.length > 0) {
      if (!update) {
        setSelectClient(clients?.clients[0]);
      } else {
        const clientLists = clients?.clients?.find(
          (item) => item.id === clientProjects?.client_id
        );

        setSelectClient(clientLists);
      }
    } else {
      setSelectClient({ name: " -No Client- ", id: null });
    }

    if (managers?.employee.length > 0) {
      if (!update) {
        setAssigneeLists(managers?.employee);
        setSelectProjectManager(managers?.employee[0]);
      } else if (update && clientProjects) {
        const managerLists = managers?.employee.find(
          (item) => item.id === clientProjects?.manager_id
        );
        const assigneeLists = managers?.employee.filter((item) =>
          clientProjects?.assignee_ids?.includes(item.id)
        );
        setSelectedAssignees(assigneeLists);
        setAllIds(assigneeLists.map((item) => item.id));
        setAssigneeLists(managers?.employee);
        setSelectProjectManager(managerLists);
      }
    } else {
      setSelectProjectManager({ name: " -No Project Manager- ", id: null });
    }

    if (priorities?.priorities.length > 0) {
      if (!update) {
        setSelectPriority(priorities?.priorities[0]);
      } else if (update && clientProjects) {
        const priorityLists = priorities?.priorities.find(
          (item) => item.id === clientProjects?.priority_id
        );
        setSelectPriority(priorityLists);
      }
    } else {
      setSelectPriority({ name: " -No Priority- ", id: null });
    }
    if (statuses?.statuses.length > 0) {
      if (!update) {
        setSelectStatus(statuses?.statuses[0]);
      } else if (update && clientProjects) {
        const statusLists = statuses?.statuses.find(
          (item) => item.id === clientProjects?.status_id
        );
        setSelectStatus(statusLists);
      }
    } else {
      setSelectStatus({ name: " -No Status- ", id: null });
    }
    if (currencyLists?.currency.length > 0) {
      if (!update) {
        setSelectCurrency(currencyLists?.currency[0]);
      } else if (update && clientProjects) {
        const currencyitems = currencyLists?.currency.find(
          (item) => item.id === clientProjects?.currency_id
        );
        setSelectCurrency(currencyitems);
      }
    } else {
      setSelectCurrency({ name: " -No Currency- ", id: null });
    }
  }, [
    clients,
    managers,
    priorities,
    statuses,
    currencyLists,
    update,
    clientProjects,
  ]);

  const isLoading =
    isLoadingClients ||
    isLoadingPriorities ||
    isLoadProjectManager ||
    isLoadingStatus ||
    isLoadingSelectCurrency ||
    loader;

  function onError(err) {
    toast.error(err?.response?.data?.message);
    console.log(err);
  }

  if (isLoading) {
    return <Skeleton />;
  }

  if (
    pClientErr ||
    pManagerErr ||
    pPrioritiesErr ||
    pStatusErr ||
    selecturrencyErr
  )
    return <Errors message="Internal Server Error" />;

  return (
    <div className="py-5 relative h-full ">
      <form
        className="space-y-4 "
        onSubmit={handleSubmit(addNewProjectHandler)}
      >
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
            lists={managers?.employee}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="flex md:flex-row items-end flex-col gap-4 w-full">
          <div className=" flex-1 ">
            <MultiSelectTextField
              label="Assignee"
              select={selectedAssignees}
              setSelect={setSelectedAssignees}
              lists={assigneeLists}
              allIds={allIds}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="flex-1">
            <SelectTextField
              label="Currency"
              select={selectCurrency}
              setSelect={setSelectCurrency}
              lists={currencyLists?.currency}
              isSubmitting={isSubmitting}
            />
          </div>
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
        <div className="w-full">
          <TextField
            label="Budget"
            required
            id="budget"
            type="number"
            message="This field is required*"
            placeholder="Budget"
            register={register}
            errors={errors}
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
            {submitLoader ? <Loaders /> : <> {update ? "Update" : "Save"}</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProjectForm;
