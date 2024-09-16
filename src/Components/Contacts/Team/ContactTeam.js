import React, { useState } from "react";

import { useRefetch } from "../../../hooks/useRefetch";
import EmptyTable from "../../helper/EmptyTable";
import TabHeader from "../TabHeader";
import Modal from "../../helper/Modal";
import AddContactTeamForm from "./AddContactTeamForm";
import ContactTeamTable from "../../helper/contacts/ContactTeamTable";
import useHashRouting from "../../../utils/useHashRouting";
import toast from "react-hot-toast";
import { useFetchContactTeamMembers } from "../../../hooks/useQuery";
import Skeleton from "../../Skeleton";
import Errors from "../../Errors";
import { UserCircle02Icon } from "../../../utils/icons";
import ProjectHeader from "../../helper/projects/ProjectHeader";

const ContactTeam = () => {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);
  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "page=1";

  const {
    isLoading: teamLoader,
    data: teamMemberLists,
    error: allTeamError,
    refetch,
  } = useFetchContactTeamMembers(paginationUrl, onError);

  useRefetch(paginationUrl, refetch);

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.errors, "Failed to fetch team members");
  }
  const onDeleteAction = (ids) => {
    alert(ids[0].id);
  };
  const onCheckAction = (ids) => {
    alert(ids[0].id);
  };
  if (allTeamError) {
    return <Errors message="Internal Server Error" />;
  }

  return (
    <React.Fragment>
      <ProjectHeader
        selectedProject={selectedClient}
        title="Team"
        setOpenModal={setOpen}
        btnTitle="Add Member"
        onDeleteAction={onDeleteAction}
        onCheckAction={onCheckAction}
        filter={false}
      />

      <React.Fragment>
        {teamLoader ? (
          <Skeleton />
        ) : (
          <>
            {teamMemberLists?.team?.length > 0 ? (
              <>
                <ContactTeamTable
                  teamLists={teamMemberLists?.team}
                  pagination={teamMemberLists?.pagination}
                  selectedClient={selectedClient}
                  setSelectedClient={setSelectedClient}
                  isAllselected={isAllselected}
                  setIsAllSelected={setIsAllSelected}
                  refetch={refetch}
                />
              </>
            ) : (
              <>
                <EmptyTable
                  Icon={UserCircle02Icon}
                  setOpen={setOpen}
                  title="  Clients Not Yet Registered"
                  subtitle="Start building your client list."
                  btnText="Add Member"
                />
              </>
            )}
          </>
        )}
      </React.Fragment>

      <Modal open={open} setOpen={setOpen} title="Add Member">
        <AddContactTeamForm setOpen={setOpen} refetch={refetch} />
      </Modal>
    </React.Fragment>
  );
};

export default ContactTeam;
