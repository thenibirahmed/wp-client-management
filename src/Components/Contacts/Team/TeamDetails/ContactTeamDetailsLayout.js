import React from "react";
import { useStoreContext } from "../../../../store/ContextApiStore";
import ContactProject from "../Projects/ContactProject";
import ContactTask from "../Tasks/ContactTask";
import useHashRouting from "../../../../utils/useHashRouting";

const ContactTeamDetailsLayout = ({ teamId }) => {
  const { contactTeamDetailsTabs } = useStoreContext();

  if (contactTeamDetailsTabs["project"]) {
    return <ContactProject teamId={teamId} />;
  } else {
    return <ContactTask teamId={teamId} />;
  }
};

export default ContactTeamDetailsLayout;
