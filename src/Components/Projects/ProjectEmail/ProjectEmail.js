import React from "react";
import { useStoreContext } from "../../../store/ContextApiStore";

import { Mail02Icon } from "../../../utils/icons";
import EmailTable from "../../helper/emails/EmailTable";
import AddNewEmail from "../../helper/emails/AddNewEmail";
import EmailHeader from "../../helper/emails/EmailHeader";

const ProjectEmail = () => {
  const { createEmail, setCreateEmail } = useStoreContext();

  const dataList = [1];

  const handler = () => {
    setCreateEmail(true);
  };

  return (
    <React.Fragment>
      <EmailHeader />

      {createEmail ? (
        <React.Fragment>
          <AddNewEmail />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {dataList.length > 0 ? (
            <>
              <EmailTable />
            </>
          ) : (
            <>
              <EmptyTable
                Icon={Mail02Icon}
                handler={handler}
                title="Inbox is Empty"
                subtitle="Start your inbox with your first email."
                btnText="Write Email"
              />
            </>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProjectEmail;
