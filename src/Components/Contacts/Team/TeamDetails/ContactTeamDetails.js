import React from "react";
import toast from "react-hot-toast";

import ClientInfo from "../../../Clients/ClientInfo";
import ContactTeamDetailsLayout from "./ContactTeamDetailsLayout";
import ContactTeamDetailsTabs from "./ContactTeamDetailsTabs";
import useHashRouting from "../../../../utils/useHashRouting";
import { useFetchSingleTeamOverview } from "../../../../hooks/useQuery";
import Skeleton from "../../../Skeleton";
import { useClientOverViewRefetch } from "../../../../hooks/useRefetch";
import { useStoreContext } from "../../../../store/ContextApiStore";

const extractProjectId = (url) => {
  const match = url.match(/contact\/#\/(\d+)/);
  return match ? match[1] : null;
};

const ContactTeamDetails = () => {
  const currentPath = useHashRouting("");

  const { isFetching } = useStoreContext();

  const teamId = extractProjectId(currentPath);

  const {
    isLoading,
    data: overview,
    error,
    refetch,
  } = useFetchSingleTeamOverview(teamId, onError);

  useClientOverViewRefetch(null, null, null, refetch, isFetching, true, teamId);

  function onError(err) {
    console.log(err);
    toast.error(err?.response?.data?.errors || "Failed to fetch team data");
  }

  if (isLoading) return <Skeleton />;

  return (
    <React.Fragment>
      <React.Fragment>
        <ClientInfo profile={overview?.profile} />
        <div className="space-y-6">
          <ContactTeamDetailsTabs bottomTab={overview?.bottomTab} />
          <React.Fragment>
            <ContactTeamDetailsLayout teamId={teamId} />
          </React.Fragment>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default ContactTeamDetails;
