import React from "react";
import TaskDetailInfo from "./TaskDetailInfo";
import TaskDetailDescriptrion from "./TaskDetailDescriptrion";
import Comments from "./Comments";
import { useStoreContext } from "../../../store/ContextApiStore";
import { useFetchSingleTask } from "../../../hooks/useQuery";
import toast from "react-hot-toast";
import Skeleton from "../../Skeleton";

const ProjectTaskDetails = () => {
  const { taskId } = useStoreContext();

  const {
    isLoading,
    data: projectTask,
    error,
    refetch,
  } = useFetchSingleTask(taskId, onError);

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed To Fetch Project Task");
  }

  if (isLoading) return <Skeleton />;

  return (
    <React.Fragment>
      <TaskDetailInfo task={projectTask} />
      <TaskDetailDescriptrion description={projectTask?.description} />
      <Comments comments={projectTask?.comments} refetch={refetch} />
    </React.Fragment>
  );
};

export default ProjectTaskDetails;
