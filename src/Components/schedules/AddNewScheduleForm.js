import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import TextField from "../helper/TextField";
import { useFetchAssignee, useFetchScheduleClient } from "../../hooks/useQuery";
import Skeleton from "../Skeleton";
import { Calendar02Icon } from "../../utils/icons";
import Loaders from "../Loaders";
import Errors from "../Errors";
import { MultiSelectTextField } from "../helper/MultiSelectTextField";
import { SelectTextField } from "../helper/SelectTextField";
import api from "../../api/api";
import { durationTypes } from "../../utils/durationTypes";

const AddNewScheduleForm = ({ refetch, setOpen }) => {
  const datePickerStartRef = useRef(null);

  const [startDate, setStartDate] = useState(new Date());

  const [selectDuration, setSelectDuration] = useState();

  const [assigneeLists, setAssigneeLists] = useState();
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [allIds, setAllIds] = useState([]);

  const [scheduleClintLists, setScheduleClintLists] = useState();
  const [selectedScheduleClient, setSelectedScheduleClient] = useState([]);
  const [allScheduleId, setAllScheduleIds] = useState([]);

  const [submitLoader, setSubmitLoader] = useState(false);

  const {
    isLoading: isLoadProjectManager,
    data: managers,
    error: pManagerErr,
  } = useFetchAssignee(onError);
  const {
    isLoading: isLoadingSchedule,
    data: schedules,
    error: scheduleErr,
  } = useFetchScheduleClient(onError);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const addNewProjectHandler = async (data) => {
    try {
      setSubmitLoader(true);

      const guestIds = [...allIds, ...allScheduleId];
      const sendData = {
        hosted_by: allIds,
        guest_ids: guestIds,
        topic: data.topic,
        description: data.description,
        scheduled_at: dayjs(startDate).format("YYYY-MM-DD HH:mm:ss"),
        duration: data.duration,
        duration_type: selectDuration.type,
        link: data.link,
      };

      const { data: response } = await api.post(`/schedule/create`, sendData);

      toast.success(response?.message || "operation success");
      await refetch();
      reset();
      setOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(response?.response?.data?.message || "Something Went Wrong");
    } finally {
      setSubmitLoader(false);
    }
  };

  useEffect(() => {
    setAllIds(selectedAssignees.map((item) => item.id));
  }, [selectedAssignees]);

  useEffect(() => {
    setAllScheduleIds(selectedScheduleClient.map((item) => item.id));
  }, [selectedScheduleClient]);

  useEffect(() => {
    if (managers?.employee.length > 0) {
      setAssigneeLists(managers?.employee);
    }
  }, [managers]);

  useEffect(() => {
    if (schedules?.clients.length > 0) {
      setScheduleClintLists(schedules?.clients);
    } else {
      setScheduleClintLists([{ id: null, name: "No Client Found" }]);
    }
  }, [schedules]);

  useEffect(() => {
    setSelectDuration(durationTypes[0]);
  }, []);

  const isLoading = isLoadProjectManager || isLoadingSchedule;

  function onError(err) {
    toast.error(err?.response?.data?.message);
    console.log(err);
  }

  if (isLoading) {
    return <Skeleton />;
  }

  if (pManagerErr || scheduleErr)
    return <Errors message="Internal Server Error" />;

  return (
    <div className="py-5 relative h-full ">
      <form
        className="space-y-4 "
        onSubmit={handleSubmit(addNewProjectHandler)}
      >
        <div className=" flex-1 ">
          <TextField
            label="Topic"
            required
            id="topic"
            type="text"
            message="This field is required*"
            placeholder="Topic"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row items-center flex-col gap-4 w-full">
          <div className="flex-1">
            <TextField
              label="Duration"
              required
              id="duration"
              type="text"
              message="This field is required*"
              placeholder="Duration"
              register={register}
              errors={errors}
            />
          </div>
          <div className="flex-1">
            <SelectTextField
              label="Duration Types"
              select={selectDuration}
              setSelect={setSelectDuration}
              lists={durationTypes}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        <div className="flex md:flex-row items-center flex-col gap-4 w-full">
          <div className=" flex-1 ">
            <MultiSelectTextField
              label="Select Schedule Client"
              select={selectedScheduleClient}
              setSelect={setSelectedScheduleClient}
              lists={scheduleClintLists}
              allIds={allScheduleId}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className=" flex-1 ">
            <MultiSelectTextField
              label="Select Employee"
              select={selectedAssignees}
              setSelect={setSelectedAssignees}
              lists={assigneeLists}
              allIds={allIds}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-sm  font-metropolis text-textColor">
              Scheduled At
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
          </div>
        </div>

        <div className=" flex-1 ">
          <TextField
            label="Link"
            id="link"
            type="link"
            message="This field is required*"
            placeholder="Link"
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
              required: { value: false, message: "Description is required*" },
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

export default AddNewScheduleForm;
