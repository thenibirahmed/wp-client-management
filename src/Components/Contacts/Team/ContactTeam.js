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

const ContactTeam = () => {
  const [open, setOpen] = useState(false);

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

  if (allTeamError) {
    return <Errors message="Internal Server Error" />;
  }

  return (
    <React.Fragment>
      <TabHeader setOpen={setOpen} btn="Add Member" />
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
