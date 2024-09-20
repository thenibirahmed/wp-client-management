import React from "react";
import TaskDetailInfo from "./TaskDetailInfo";
import TaskDetailDescriptrion from "./TaskDetailDescriptrion";
import Comments from "./Comments";
import { useStoreContext } from "../../../store/ContextApiStore";
import { useFetchSingleTask } from "../../../hooks/useQuery";
import toast from "react-hot-toast";

const ProjectTaskDetails = () => {
  const { taskId } = useStoreContext();

  const {
    isLoading,
    data: projectTask,
    error,
    refetch,
  } = useFetchSingleTask(taskId, onError);
  console.log("projectask View", projectTask);

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed To Fetch Project Task");
  }

  return (
    <React.Fragment>
      <TaskDetailInfo />
      <TaskDetailDescriptrion />
      <Comments />
    </React.Fragment>
  );
};

export default ProjectTaskDetails;
