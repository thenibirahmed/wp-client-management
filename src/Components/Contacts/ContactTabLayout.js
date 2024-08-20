import React from "react";
import ContactTeam from "./ContactTeam";
import ContactClient from "./ContactClient";
import { useStoreContext } from "../../store/ContextApiStore";

const ContactTabLayout = () => {
  const { contactTabs } = useStoreContext();

  if (contactTabs["team"]) {
    return <ContactTeam />;
  } else {
    return <ContactClient />;
  }
};

export default ContactTabLayout;
