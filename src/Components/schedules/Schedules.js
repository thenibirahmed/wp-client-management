import React, { useState } from "react";

import ProjectHeader from "../helper/projects/ProjectHeader";
import Modal from "../helper/Modal";
import AddNewScheduleForm from "./AddNewScheduleForm";
import ScheduleTable from "./ScheduleTable";
import Skeleton from "../Skeleton";
import Errors from "../Errors";
import { useFetchSchedules } from "../../hooks/useQuery";
import useHashRouting from "../../utils/useHashRouting";
import EmptyTable from "../helper/EmptyTable";
import { UserCircle02Icon } from "../../utils/icons";
import { useRefetch } from "../../hooks/useRefetch";

const Schedules = () => {
  const [openModal, setOPenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "page=1";

  const {
    isLoading,
    data: schedule,
    error,
    refetch,
  } = useFetchSchedules(paginationUrl, onError);

  useRefetch(paginationUrl, null, null, null, null, null, refetch);

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetchClientOverView data");
  }

  if (isLoading) return <Skeleton />;

  if (error)
    return (
      <Errors
        message={
          error?.response?.data?.errors?.id[0] ||
          "Failed to fetch schedules Data"
        }
      />
    );

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
          check={false}
        />
      </div>

      {schedule?.schedules?.length > 0 ? (
        <ScheduleTable
          scheduleData={schedule?.schedules}
          pagination={schedule?.pagination}
          selectedClient={selectedProject}
          setSelectedClient={setSelectedProject}
          isAllselected={isAllselected}
          setIsAllSelected={setIsAllSelected}
          refetch={refetch}
        />
      ) : (
        <>
          <EmptyTable
            Icon={UserCircle02Icon}
            handler={() => setOPenModal(true)}
            title="  Schedule Not Created Yet"
            subtitle="Start building your schedule list."
            btnText=" Add Schedule"
          />
        </>
      )}

      <Modal open={openModal} setOpen={setOPenModal} title="Add Schedule">
        <AddNewScheduleForm refetch={refetch} setOpen={setOPenModal} />
      </Modal>
    </>
  );
};

export default Schedules;
