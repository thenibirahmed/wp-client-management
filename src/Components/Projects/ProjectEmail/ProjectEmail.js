import React from "react";
import { useStoreContext } from "../../../store/ContextApiStore";

import { Mail02Icon } from "../../../utils/icons";
import EmailTable from "../../helper/emails/EmailTable";
import AddNewEmail from "../../helper/emails/AddNewEmail";
import EmailHeader from "../../helper/emails/EmailHeader";
import { useFetchProjectEmails } from "../../../hooks/useQuery";
import Errors from "../../Errors";
import Skeleton from "../../Skeleton";
import EmptyTable from "../../helper/EmptyTable";

const ProjectEmail = ({ projectId }) => {
  const { createEmail, setCreateEmail } = useStoreContext();

  const dataList = [1];

  const {
    isLoading,
    data: projectEmail,
    error,
    refetch,
  } = useFetchProjectEmails(projectId, onError);

  function onError(err) {
    console.log(err);
    toast.error(
      err?.response?.data?.message || "Failed To Fetch Project Email"
    );
  }

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

  const handler = () => {
    setCreateEmail(true);
  };

  return (
    <React.Fragment>
      <EmailHeader />

      {createEmail ? (
        <React.Fragment>
          <AddNewEmail
            emailsData={projectEmail?.emails}
            pagination={projectEmail?.pagination}
            refetch={refetch}
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
