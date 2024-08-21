import React, { useState } from "react";

import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon, Task01Icon } from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";

import Modal from "../../helper/Modal";
import ProjectTaskTable from "../../helper/projectTask/ProjectTaskTable";
import ProjectTaskHeader from "../../helper/projectTask/ProjectTaskHeader";
import AddNewTaskForm from "../../helper/projectTask/AddNewTaskForm";

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
      <Modal open={openTask} setOpen={setOpenTask} title="Add Task">
        <AddNewTaskForm />
      </Modal>
    </React.Fragment>
  );
};

export default ProjectTask;
