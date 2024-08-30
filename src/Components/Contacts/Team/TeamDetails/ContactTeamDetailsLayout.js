import React from "react";
import { useStoreContext } from "../../../../store/ContextApiStore";
import ContactProject from "../Projects/ContactProject";
import ContactTask from "../Tasks/ContactTask";

const ContactTeamDetailsLayout = () => {
  const { contactTeamDetailsTabs } = useStoreContext();

  if (contactTeamDetailsTabs["project"]) {
    return <ContactProject />;
  } else {
    return <ContactTask />;
  }
};

export default ContactTeamDetailsLayout;
