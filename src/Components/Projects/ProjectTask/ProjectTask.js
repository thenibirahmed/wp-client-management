import React, { useState } from "react";

import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon, Task01Icon } from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";

import ProjectTaskTable from "./ProjectTaskTable";
import ProjectTaskHeader from "./ProjectTaskHeader";
import Modal from "../../helper/Modal";
import AddNewTaskForm from "./AddNewTaskForm";

const ProjectTask = () => {
  const { openTask, setOpenTask } = useStoreContext();
  const dataList = [1];

  const handler = () => {
    setOpenProjectModal(true);
  };
  return (
    <React.Fragment>
      <ProjectTaskHeader />
      {dataList.length > 0 ? (
        <>
          <ProjectTaskTable />
        </>
      ) : (
        <>
          <EmptyTable
            Icon={Task01Icon}
            handler={handler}
            title="Projects Await Initiation"
            subtitle="Initiate your first project now."
            btnText="Add Project"
          />
        </>
      )}
      <Modal open={openTask} setOpen={setOpenTask}>
        <AddNewTaskForm />
      </Modal>
    </React.Fragment>
  );
};

export default ProjectTask;
