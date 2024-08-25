import React, { useState } from "react";
import EmptyTable from "../helper/EmptyTable";
import TabHeader from "./TabHeader";
import Modal from "../helper/Modal";
import AddContactClientForm from "./AddContactClientForm";
import ContactClientTable from "../helper/contacts/ContactClientTable";

const ContactClient = () => {
  const [open, setOpen] = useState(false);
  const dataList = [1];
  return (
    <React.Fragment>
      <TabHeader setOpen={setOpen} btn="Add Client" />
      {dataList.length > 0 ? (
        <>
          <ContactClientTable />
        </>
      ) : (
        <>
          <EmptyTable
            Icon={UserCircle02Icon}
            setOpen={setOpen}
            title="  Clients Not Yet Registered"
            subtitle="Start building your client list."
            btnText="Add Client"
          />
        </>
      )}
      <Modal open={open} setOpen={setOpen} title="Add Client">
        <AddContactClientForm setOpen={setOpen} />
      </Modal>
    </React.Fragment>
  );
};

export default ContactClient;
