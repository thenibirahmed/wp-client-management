import React, { useState } from "react";
import ProjectHeader from "../helper/projects/ProjectHeader";
import Modal from "../helper/Modal";
import AddNewScheduleForm from "./AddNewScheduleForm";

const Schedules = () => {
  const [openModal, setOPenModal] = useState(false);

  return (
    <>
      <div>
        <ProjectHeader
          selectedProject={[]}
          title="All Schedules"
          setOpenModal={setOPenModal}
          btnTitle="Add Schedule"
          onDeleteAction={() => {}}
          onCheckAction={() => {}}
          searchACtive={false}
        />
      </div>

      <Modal open={openModal} setOpen={setOPenModal} title="Add Schedule">
        <AddNewScheduleForm refetch={() => {}} setOpen={setOPenModal} />
      </Modal>
    </>
  );
};

export default Schedules;
