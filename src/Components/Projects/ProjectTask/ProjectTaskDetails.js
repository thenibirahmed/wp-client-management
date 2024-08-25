import React from "react";
import TaskDetailInfo from "./TaskDetailInfo";
import TaskDetailDescriptrion from "./TaskDetailDescriptrion";
import Comments from "./Comments";

const ProjectTaskDetails = () => {
  return (
    <React.Fragment>
      <TaskDetailInfo />
      <TaskDetailDescriptrion />
      <Comments />
    </React.Fragment>
  );
};

export default ProjectTaskDetails;
