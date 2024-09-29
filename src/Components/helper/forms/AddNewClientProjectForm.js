import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import { useStoreContext } from "../../../store/ContextApiStore";
import { SelectTextField } from "../SelectTextField";
import {
  useFetchAssignee,
  useFetchPriorities,
  useFetchProjectEditDetails,
  useFetchSelectCurrency,
  useFetchStatus,
} from "../../../hooks/useQuery";
import Errors from "../../Errors";
import Skeleton from "../../Skeleton";
import { Calendar02Icon } from "../../../utils/icons";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import api from "../../../api/api";
import dayjs from "dayjs";
import Loaders from "../../Loaders";
import { MultiSelectTextField } from "../MultiSelectTextField";
import { useUpdateDefaultProjectValue } from "../../../hooks/useRefetch";

const AddNewClientProjectForm = ({
  clientId,
  refetch,
  update = false,
  projectId,
}) => {
  const datePickerStartRef = useRef(null);
  const datePickerDueRef = useRef(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { setOpenProjectModal, setOpenProjectUpdateModal } = useStoreContext();
  const [selectStatus, setSelectStatus] = useState(2);
  const [selectPriority, setSelectPriority] = useState();
  const [selectProjectManager, setSelectProjectManager] = useState();
  const [selectCurrency, setSelectCurrency] = useState();
  const [submitLoader, setSubmitLoader] = useState(false);
  const [assigneeLists, setAssigneeLists] = useState();
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [allIds, setAllIds] = useState([]);
  const imageRef = useRef();

  const {
    isLoading: loader,
    data: clientProjects,
    error,
  } = useFetchProjectEditDetails(projectId, update, "client", onError);

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
    "client"
  );

  const addNewClientProjectHandler = async (data) => {
    if (!selectProjectManager?.id || !selectStatus?.id || !selectPriority?.id) {
      return setError("This field is required*");
    }

    if (allIds?.length === 0) {
      return;
    }

    setSubmitLoader(true);

    const idsLists = allIds.map((item) => item);
    console.log("ids", idsLists);
    const sendData = {
      title: data.title,
      manager_id: selectProjectManager?.id,
      client_id: Number(clientId),
      status_id: selectStatus?.id,
      priority_id: selectPriority?.id,
      currency_id: selectCurrency?.id,
      assignee_ids: [...allIds],
      budget: data.budget,
      start_date: dayjs(startDate).format("YYYY-MM-DD"),
      due_date: dayjs(endDate).format("YYYY-MM-DD"),
      description: data?.description,
    };
    console.log("sending data", sendData);

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
      await refetch();
      reset();
      setOpenProjectModal(false);
      setOpenProjectUpdateModal(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitLoader(false);
    }
  };

  useEffect(() => {
    setAllIds(selectedAssignees.map((item) => item.id));
  }, [selectedAssignees]);

  useEffect(() => {
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
  }, [managers, priorities, statuses, currencyLists, clientProjects, update]);

  const onImageUploadHandler = () => {
    imageRef.current.click();
  };

  const isLoading =
    isLoadProjectManager ||
    isLoadingStatus ||
    isLoadingPriorities ||
    loader ||
    isLoadingSelectCurrency;

  function onError(err) {
    toast.error(err?.response?.data?.message?.errors || "Something went wrong");
    console.log(err);
  }

  if (isLoading) {
    return <Skeleton />;
  }

  if (pManagerErr || pPrioritiesErr || pStatusErr || selecturrencyErr)
    return <Errors message="Internal Server Error" />;

  return (
    <div className="py-5 relative h-full ">
      <form
        className="space-y-4 "
        onSubmit={handleSubmit(addNewClientProjectHandler)}
      >
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

          {/* <SelectTextField
            label="Client Name"
            select={selectClientName}
            setSelect={setSelectClientName}
            lists={people}
            isSubmitting={isSubmitting}
          /> */}
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
          <SelectTextField
            label="Currency"
            select={selectCurrency}
            setSelect={setSelectCurrency}
            lists={currencyLists?.currency}
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
          <SelectTextField
            label="Project Manager"
            select={selectProjectManager}
            setSelect={setSelectProjectManager}
            lists={managers?.employee}
            isSubmitting={isSubmitting}
          />
          <MultiSelectTextField
            label="Assignee"
            select={selectedAssignees}
            setSelect={setSelectedAssignees}
            lists={assigneeLists}
            isSubmitting={isSubmitting}
            allIds={allIds}
            update={update}
          />
        </div>
        <React.Fragment>
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
        </React.Fragment>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="desc"
            className={`font-medium text-sm  font-metropolis text-textColor `}
          >
            Description
          </label>
          <textarea
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
            {submitLoader ? <Loaders /> : <> {update ? "Update" : "Save"}</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewClientProjectForm;
