import React from "react";
import ClientInfo from "../../../Clients/ClientInfo";
import ContactTeamDetailsLayout from "./ContactTeamDetailsLayout";
import ContactTeamDetailsTabs from "./ContactTeamDetailsTabs copy";
import useHashRouting from "../../../../utils/useHashRouting";
const extractProjectId = (url) => {
  const match = url.match(/contact\/#\/(\d+)/);
  return match ? match[1] : null;
};

const ContactTeamDetails = () => {
  const currentPath = useHashRouting("");

  const teamId = extractProjectId(currentPath);

  return (
    <React.Fragment>
      <React.Fragment>
        <ClientInfo teamId={teamId} />
        <div className="space-y-6">
          <ContactTeamDetailsTabs />
          <React.Fragment>
            <ContactTeamDetailsLayout teamId={teamId} />
          </React.Fragment>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default ContactTeamDetails;
