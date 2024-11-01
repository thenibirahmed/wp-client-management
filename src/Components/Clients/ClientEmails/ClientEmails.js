import React, { useState } from "react";
import toast from "react-hot-toast";

import { useStoreContext } from "../../../store/ContextApiStore";
import { Mail02Icon } from "../../../utils/icons";
import EmailTable from "../../helper/emails/EmailTable";
import AddNewEmail from "../../helper/emails/AddNewEmail";
import EmailHeader from "../../helper/emails/EmailHeader";
import useHashRouting from "../../../utils/useHashRouting";
import { useBulkDelete, useFetchProjectEmails } from "../../../hooks/useQuery";
import { useRefetch } from "../../../hooks/useRefetch";
import EmptyTable from "../../helper/EmptyTable";
import Skeleton from "../../Skeleton";
import Errors from "../../Errors";
import { BulkDeleteModal } from "../../BulkDeleteModal";

const ClientEmails = ({ clientId }) => {
  const [loader, setLoader] = useState(false);
  const {
    createEmail,
    setCreateEmail,
    dateFrom,
    dateTo,
    searchText,
    setSearchText,
    setIsFetching,
    bulkDeleteClientEmail,
    setBulkDeleteClientEmail,
  } = useStoreContext();

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
  } = useFetchProjectEmails(
    clientId,
    paginationUrl,
    searchText,
    dateFrom,
    dateTo,
    "client",
    onError
  );

  useRefetch(paginationUrl, searchText, dateFrom, dateTo, null, null, refetch);

  const handler = () => {
    setCreateEmail(true);
  };

  const onDeleteAction = async (ids) => {
    setIsFetching(true);
    await useBulkDelete(
      "/emails/bulk-delete",
      ids,
      refetch,
      setLoader,
      false,
      setBulkDeleteClientEmail
    );
    setSelectedEmail([]);
    setIsFetching(false);
  };
  const onEmailBox = (ids) => {};

  function onError(err) {
    console.log(err);
    toast.error(
      err?.response?.data?.message || "Failed To Fetch Project Email"
    );
  }

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
        setOpenBulkActionModal={setBulkDeleteClientEmail}
        onEmailBox={onEmailBox}
        searchText={searchText}
        setSearchText={setSearchText}
        loader={loader}
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

      <BulkDeleteModal
        loader={loader}
        open={bulkDeleteClientEmail}
        setOpen={setBulkDeleteClientEmail}
        onDeleteAction={() => onDeleteAction(selectedEmail)}
        title="Delete Email"
      />
    </React.Fragment>
  );
};

export default ClientEmails;
