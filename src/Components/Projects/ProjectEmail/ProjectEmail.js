import React, { useState } from "react";

import { useStoreContext } from "../../../store/ContextApiStore";
import { Mail02Icon } from "../../../utils/icons";
import EmailTable from "../../helper/emails/EmailTable";
import AddNewEmail from "../../helper/emails/AddNewEmail";
import EmailHeader from "../../helper/emails/EmailHeader";
import { useBulkDelete, useFetchProjectEmails } from "../../../hooks/useQuery";
import Errors from "../../Errors";
import Skeleton from "../../Skeleton";
import EmptyTable from "../../helper/EmptyTable";
import useHashRouting from "../../../utils/useHashRouting";
import { useRefetch } from "../../../hooks/useRefetch";
import api from "../../../api/api";

const ProjectEmail = ({ projectId }) => {
  const [loader, setLoader] = useState(false);
  const {
    createEmail,
    setCreateEmail,
    dateFrom,
    dateTo,
    searchText,
    setSearchText,
  } = useStoreContext();

  const [selectedEmail, setSelectedEmail] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "email=1";

  const {
    isLoading,
    data: projectEmail,
    error,
    refetch,
  } = useFetchProjectEmails(
    projectId,
    paginationUrl,
    searchText,
    dateFrom,
    dateTo,
    "project",
    onError
  );

  useRefetch(paginationUrl, searchText, dateFrom, dateTo, null, null, refetch);

  function onError(err) {
    console.log(err);
    toast.error(
      err?.response?.data?.message || "Failed To Fetch Project Email"
    );
  }

  const handler = () => {
    setCreateEmail(true);
  };

  const onDeleteAction = async (ids) => {
    useBulkDelete("/emails/bulk-delete", ids, refetch, setLoader, false);
  };
  const onEmailBox = (ids) => {};

  if (error) {
    console.log("project task error", error?.response?.data?.errors);
    return (
      <Errors
        message={
          error?.response?.data?.errors ||
          `Failed To Fetch Project Task for projectId ${projectId}`
        }
      />
    );
  }

  return (
    <React.Fragment>
      <EmailHeader
        selectedEmail={selectedEmail}
        onDeleteAction={onDeleteAction}
        onEmailBox={onEmailBox}
        searchText={searchText}
        setSearchText={setSearchText}
        loader={loader}
      />

      {createEmail ? (
        <React.Fragment>
          <AddNewEmail
            emailsData={projectEmail?.emails}
            pagination={projectEmail?.pagination}
            refetch={refetch}
            setOpen={setCreateEmail}
            projectId={projectId}
            slug="projects"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {isLoading ? (
            <>
              <Skeleton />
            </>
          ) : (
            <>
              {projectEmail?.emails?.length > 0 ? (
                <>
                  <EmailTable
                    emailsData={projectEmail?.emails}
                    pagination={projectEmail?.pagination}
                    projectId={projectId}
                    slug="projects"
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

export default ProjectEmail;
