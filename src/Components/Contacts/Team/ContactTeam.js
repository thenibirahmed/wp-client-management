import React, { useState } from "react";
import EmptyTable from "../../helper/EmptyTable";
import TabHeader from "../TabHeader";
import Modal from "../../helper/Modal";
import AddContactTeamForm from "./AddContactTeamForm";
import ContactTeamTable from "../../helper/contacts/ContactTeamTable";

const ContactTeam = () => {
  const [open, setOpen] = useState(false);
  const dataList = [1];
  return (
    <React.Fragment>
      <TabHeader setOpen={setOpen} btn="Add Member" />
      {dataList.length > 0 ? (
        <>
          <ContactTeamTable />
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
      <Modal open={open} setOpen={setOpen} title="Add Member">
        <AddContactTeamForm setOpen={setOpen} />
      </Modal>
    </React.Fragment>
  );
};

export default ContactTeam;
