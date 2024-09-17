import React, { useState } from "react";
import { useStoreContext } from "../../../store/ContextApiStore";

import { Mail02Icon } from "../../../utils/icons";
import EmailTable from "../../helper/emails/EmailTable";
import AddNewEmail from "../../helper/emails/AddNewEmail";
import EmailHeader from "../../helper/emails/EmailHeader";
import useHashRouting from "../../../utils/useHashRouting";
import { useFetchProjectEmails } from "../../../hooks/useQuery";
import { useRefetch } from "../../../hooks/useRefetch";
import EmptyTable from "../../helper/EmptyTable";
import Skeleton from "../../Skeleton";
import Errors from "../../Errors";

const ClientEmails = ({ clientId }) => {
  const { createEmail, setCreateEmail } = useStoreContext();

  const [selectedEmail, setSelectedEmail] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

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

  const onDeleteAction = (ids) => {
    alert(ids[0].id);
  };
  const onEmailBox = (ids) => {
    alert(ids[0].id);
  };

  if (error)
    return (
      <Errors
        message={error?.response?.data?.errors || "Internal Server Error"}
      />
    );

  return (
    <React.Fragment>
      <EmailHeader
        selectedEmail={selectedEmail}
        onDeleteAction={onDeleteAction}
        onEmailBox={onEmailBox}
      />

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
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              {clientEmail?.emails?.length > 0 ? (
                <>
                  <EmailTable
                    emailsData={clientEmail?.emails}
                    pagination={clientEmail?.pagination}
                    projectId={clientId}
                    slug="clients"
                    refetch={refetch}
                    selectedEmail={selectedEmail}
                    setSelectedEmail={setSelectedEmail}
                    isAllselected={isAllselected}
                    setIsAllSelected={setIsAllSelected}
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
            </>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ClientEmails;
