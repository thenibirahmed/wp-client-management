import React from "react";
import ClientInfo from "../../../Clients/ClientInfo";
import ContactTeamDetailsLayout from "./ContactTeamDetailsLayout";
import ContactTeamDetailsTabs from "./ContactTeamDetailsTabs copy";

const ContactTeamDetails = () => {
  return (
    <React.Fragment>
      <React.Fragment>
        <ClientInfo />
        <div className="space-y-6">
          <ContactTeamDetailsTabs />
          <React.Fragment>
            <ContactTeamDetailsLayout />
          </React.Fragment>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default ContactTeamDetails;
