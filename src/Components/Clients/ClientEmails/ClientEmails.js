import React from "react";
import { useStoreContext } from "../../../store/ContextApiStore";

import { Mail02Icon } from "../../../utils/icons";
import EmailTable from "../../helper/emails/EmailTable";
import AddNewEmail from "../../helper/emails/AddNewEmail";
import EmailHeader from "../../helper/emails/EmailHeader";
import useHashRouting from "../../../utils/useHashRouting";
import { useFetchProjectEmails } from "../../../hooks/useQuery";
import { useRefetch } from "../../../hooks/useRefetch";
import EmptyTable from "../../helper/EmptyTable";

const ClientEmails = ({ clientId }) => {
  const { createEmail, setCreateEmail } = useStoreContext();

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "email=1";

  const {
    isLoading,
    data: clientEmail,
    error,
    refetch,
  } = useFetchProjectEmails(clientId, paginationUrl, "client", onError);

  useRefetch(paginationUrl, refetch);

  function onError(err) {
    console.log(err);
    toast.error(
      err?.response?.data?.message || "Failed To Fetch Project Email"
    );
  }

  const handler = () => {
    setCreateEmail(true);
  };

  return (
    <React.Fragment>
      <EmailHeader />

      {createEmail ? (
        <React.Fragment>
          <AddNewEmail
            emailsData={clientEmail?.emails}
            pagination={clientEmail?.pagination}
            refetch={refetch}
            setOpen={setCreateEmail}
            projectId={clientId}
            slug="clients"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {clientEmail?.emails?.length > 0 ? (
            <>
              <EmailTable
                emailsData={clientEmail?.emails}
                pagination={clientEmail?.pagination}
                projectId={clientId}
                slug="clients"
              />
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
