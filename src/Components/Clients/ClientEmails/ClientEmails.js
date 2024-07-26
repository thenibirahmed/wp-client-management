import React from "react";
import { useStoreContext } from "../../../store/ContextApiStore";
import ClientEmailHeader from "./ClientEmailHeader";
import AddNewEmail from "./AddNewEmail";
import ClientEmailTable from "./ClientEmailTable";
import { Mail02Icon } from "../../../utils/icons";

const ClientEmails = () => {
  const { createEmail, setCreateEmail } = useStoreContext();

  const dataList = [1];

  const handler = () => {
    setCreateEmail(true);
  };

  return (
    <React.Fragment>
      <ClientEmailHeader />

      {createEmail ? (
        <React.Fragment>
          <AddNewEmail />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {dataList.length > 0 ? (
            <>
              <ClientEmailTable />
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

export default ClientEmails;
