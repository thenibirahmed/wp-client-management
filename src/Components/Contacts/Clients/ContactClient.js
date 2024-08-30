import React, { useState } from "react";

import TabHeader from "../TabHeader";
import EmptyTable from "../../helper/EmptyTable";
import Modal from "../../helper/Modal";
import ContactClientTable from "../../helper/contacts/ContactClientTable";
import AddClientForm from "../../Clients/AddClientForm";

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
        <AddClientForm setOpen={setOpen} />
      </Modal>
    </React.Fragment>
  );
};

export default ContactClient;
