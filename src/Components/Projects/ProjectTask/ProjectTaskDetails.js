import React from "react";
import TaskDetailInfo from "./TaskDetailInfo";
import TaskDetailDescriptrion from "./TaskDetailDescriptrion";
import Comments from "./Comments";
import { useStoreContext } from "../../../store/ContextApiStore";

const ProjectTaskDetails = () => {
  const { taskId } = useStoreContext();
  console.log(taskId);
  return (
    <React.Fragment>
      <TaskDetailInfo />
      <TaskDetailDescriptrion />
      <Comments />
    </React.Fragment>
  );
};

export default ProjectTaskDetails;
