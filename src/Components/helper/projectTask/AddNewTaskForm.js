import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";

import api from "../../../api/api";
import { Calendar02Icon } from "../../../utils/icons";
import TextField from "../TextField";
import { useStoreContext } from "../../../store/ContextApiStore";
import { SelectTextField } from "../SelectTextField";
import {
  useFetchAssignee,
  useFetchPriorities,
  useFetchProjectEditDetails,
  useFetchSelectProjects,
  useFetchStatus,
  useFetchTaskEditDetails,
} from "../../../hooks/useQuery";
import useHashRouting from "../../../utils/useHashRouting";
import Skeleton from "../../Skeleton";
import Errors from "../../Errors";
import Loaders from "../../Loaders";
import dayjs from "dayjs";
import { useUpdateDefaultTaskValue } from "../../../hooks/useRefetch";

const AddNewTaskForm = ({
  refetch,
  setOpen,
  update,
  taskId,
  contact = false,
}) => {
  const { setOpenProjectModal, setOpenUpdateTask, setIsFetching } =
    useStoreContext();
  const datePickerStartRef = useRef(null);
  const datePickerDueRef = useRef(null);
  const imageRef = useRef();

  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const [selectedProject, setSelectedProject] = useState();
  const [selectPriority, setSelectPriority] = useState();
  const [selectStatus, setSelectStatus] = useState();
  const [selectAssignee, setSelectAssignee] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [submitLoader, setSubmitLoader] = useState(false);

  const {
    isLoading: loader,
    data: projectTask,
    error,
  } = useFetchTaskEditDetails(taskId, update, onError);

  const {
    data: assignee,
    error: assigneeErr,
    isLoading: assigneeLoader,
  } = useFetchAssignee();

  const {
    isLoading: isLoadingPriorities,
    data: priorities,
    error: pPrioritiesErr,
  } = useFetchPriorities("project", onError);

  const {
    isLoading: isLoadingStatus,
    data: statuses,
    error: pStatusErr,
  } = useFetchStatus("task", onError);

  const {
    isLoading: isLoadingSelectProject,
    data: projectsLists,
    error: selectProjectErr,
  } = useFetchSelectProjects(onError);

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
  useUpdateDefaultTaskValue(
    update,
    projectTask,
    setValue,
    setStartDate,
    setEndDate
  );

  const addNewTaskHandler = async (data) => {
    const projectId = pathArray[1] ? Number(pathArray[1]) : null;

    setSubmitLoader(true);

    const sendData = {
      title: data.title,
      assigned_to: selectAssignee?.id,
      priority_id: selectPriority.id,
      status_id: selectStatus?.id,
      start_date: dayjs(startDate).format("YYYY-MM-DD"),
      end_date: dayjs(endDate).format("YYYY-MM-DD"),
      description: data.description,
    };

    if (!contact) {
      if (!update) {
        sendData.project_id = projectId;
      }
    } else {
      sendData.project_id = selectedProject?.id;
    }

    try {
      let res;
      if (update) {
        let { data } = await api.put(`/task/update/${taskId}`, sendData);
        res = data;
      } else {
        let { data } = await api.post("/task/create", sendData);
        res = data;
      }

      toast.success(res?.message || "operation success");
      await refetch();
      setOpen(false);
      setIsFetching(true);
      setOpenUpdateTask(false);
      reset();
    } catch (err) {
      console.log(err);
      toast.error("Create new task failed");
    } finally {
      setSubmitLoader(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (assignee?.employee.length > 0) {
      if (!update) {
        setSelectAssignee(assignee?.employee[0]);
      } else {
        const assignedTo = assignee?.employee.find(
          (item) => item.id === projectTask?.assigned_to
        );
        setSelectAssignee(assignedTo);
      }
    } else {
      setSelectAssignee({ name: " -No Assignee- ", id: null });
    }

    if (statuses?.statuses.length > 0) {
      if (!update) {
        setSelectStatus(statuses?.statuses[0]);
      } else if (update && projectTask) {
        const statusLists = statuses?.statuses.find(
          (item) => item.id === projectTask?.status_id
        );
        setSelectStatus(statusLists);
      }
    } else {
      setSelectStatus({ name: " -No Status- ", id: null });
    }

    if (priorities?.priorities.length > 0) {
      if (!update) {
        setSelectPriority(priorities?.priorities[0]);
      } else if (update && projectTask) {
        const priorityLists = priorities?.priorities.find(
          (item) => item.id === projectTask?.priority_id
        );
        setSelectPriority(priorityLists);
      }
    } else {
      setSelectPriority({ name: " -No Priority- ", id: null });
    }

    if (projectsLists?.projects?.length > 0) {
      if (!update) {
        setSelectedProject(projectsLists?.projects[0]);
      } else if (update && projectTask) {
        const projectList = projectsLists?.projects.find(
          (item) => item.id === projectTask?.project_id
        );
        setSelectedProject(projectList);
      }
    } else {
      setSelectedProject({ name: " -No Project- ", id: null });
    }
  }, [assignee, priorities, statuses, projectTask, projectsLists]);

  const onImageUploadHandler = () => {
    imageRef.current.click();
  };

  function onError(err) {
    toast.error(err?.response?.data?.message);
    console.log(err);
  }

  const isLoading = isLoadingPriorities || assigneeLoader;

  if (isLoading) {
    return <Skeleton />;
  }

  if (pPrioritiesErr || assigneeErr)
    return <Errors message="Internal Server Error" />;

  return (
    <div className="py-5 relative h-full ">
      <form className="space-y-4 " onSubmit={handleSubmit(addNewTaskHandler)}>
        <div>
          <TextField
            label="Title"
            required
            id="title"
            type="text"
            message="This field is required*"
            placeholder="Title"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <div className="flex-1">
            <SelectTextField
              label="Assignee"
              select={selectAssignee}
              setSelect={setSelectAssignee}
              lists={assignee?.employee}
              isSubmitting={isSubmitting}
            />
          </div>
          {contact && (
            <div className="flex-1">
              <SelectTextField
                label="Project Title"
                select={selectedProject}
                setSelect={setSelectedProject}
                lists={projectsLists?.projects}
                isSubmitting={isSubmitting}
              />
            </div>
          )}
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
              End Date
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
            {...register("description")}
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

export default AddNewTaskForm;
