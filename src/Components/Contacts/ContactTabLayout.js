import React from "react";
import ContactTeam from "./Team/ContactTeam";

import { useStoreContext } from "../../store/ContextApiStore";
import ContactClient from "./Clients/ContactClient";

const ContactTabLayout = () => {
  const { contactTabs } = useStoreContext();

  if (contactTabs["team"]) {
    return <ContactTeam />;
  } else {
    return <ContactClient />;
  }
};

export default ContactTabLayout;
