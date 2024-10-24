import React, { useState } from "react";
import ProjectHeader from "../helper/projects/ProjectHeader";
import Modal from "../helper/Modal";
import AddNewScheduleForm from "./AddNewScheduleForm";
import ScheduleTable from "./ScheduleTable";

const clientData = [
  {
    client_id: 1,
    creator: "John Doe",
    duration: "2 hours",
    guests: "Alice, Bob",
    host: "John Smith",
    link: "https://example.com/meeting1",
    scheduled_at: "2024-10-24 10:00 AM",
    topic: "Project Kickoff",
    description: "Discussing the project overview and goals.",
    id: 101,
  },
  {
    client_id: 2,
    creator: "Jane Roe",
    duration: "1 hour",
    guests: "Charlie, Eve",
    host: "Jane Smith",
    link: "https://example.com/meeting2",
    scheduled_at: "2024-10-25 02:00 PM",
    topic: "Design Review",
    description: "Reviewing the design mockups and architecture.",
    id: 102,
  },
  {
    client_id: 3,
    creator: "Adam West",
    duration: "30 minutes",
    guests: "Mallory, Trudy",
    host: "Adam Blake",
    link: "https://example.com/meeting3",
    scheduled_at: "2024-10-26 09:30 AM",
    topic: "Sprint Planning",
    description: "Planning the tasks for the next sprint.",
    id: 103,
  },
  {
    client_id: 4,
    creator: "Bruce Wayne",
    duration: "3 hours",
    guests: "Clark, Diana",
    host: "Bruce Stark",
    link: "https://example.com/meeting4",
    scheduled_at: "2024-10-27 11:00 AM",
    topic: "Stakeholder Update",
    description: "Providing updates to stakeholders on progress.",
    id: 104,
  },
  {
    client_id: 5,
    creator: "Tony Stark",
    duration: "45 minutes",
    guests: "Natasha, Steve",
    host: "Tony Banner",
    link: "https://example.com/meeting5",
    scheduled_at: "2024-10-28 04:00 PM",
    topic: "Technical Discussion",
    description: "Discussing technical implementation details.",
    id: 105,
  },
];

const Schedules = () => {
  const [openModal, setOPenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  return (
    <>
      <div>
        <ProjectHeader
          selectedProject={selectedProject}
          title="All Schedules"
          setOpenModal={setOPenModal}
          btnTitle="Add Schedule"
          onDeleteAction={() => {}}
          onCheckAction={() => {}}
          searchACtive={false}
          check={false}
        />
      </div>

      <ScheduleTable
        clientData={clientData}
        selectedClient={selectedProject}
        setSelectedClient={setSelectedProject}
        isAllselected={isAllselected}
        setIsAllSelected={setIsAllSelected}
      />

      <Modal open={openModal} setOpen={setOPenModal} title="Add Schedule">
        <AddNewScheduleForm refetch={() => {}} setOpen={setOPenModal} />
      </Modal>
    </>
  );
};

export default Schedules;
