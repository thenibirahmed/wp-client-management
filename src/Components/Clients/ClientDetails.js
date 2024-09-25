import React from "react";

import ClientOverView from "./ClientOverView";
import ClientInfo from "./ClientInfo";
import ClientDetailsLayout from "./ClientDetailsLayout";
import { useStoreContext } from "../../store/ContextApiStore";
import Tab from "../helper/Tabs";
import AddNewInvoice from "../helper/invoices/addNewInvoice/AddNewInvoice";
import { useFetchSingleClientOverView } from "../../hooks/useQuery";
import Skeleton from "../Skeleton";
import useHashRouting from "../../utils/useHashRouting";
import toast from "react-hot-toast";
import Errors from "../Errors";

const extractProjectId = (url) => {
  const match = url.match(/clients\/#\/(\d+)/);
  return match ? match[1] : null;
};

const ClientDetails = () => {
  const currentPath = useHashRouting("");

  const clientId = extractProjectId(currentPath);

  const { createInvoice, updateInvoice } = useStoreContext();
  const {
    isLoading,
    data: singleClientOverView,
    error,
  } = useFetchSingleClientOverView(clientId, onError);

  if (isLoading) return <Skeleton />;

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetchClientOverView data");
  }

  if (error)
    return (
      <Errors
        message={
          error?.response?.data?.errors?.id[0] ||
          `Failed to fetch client Overview Data for ClientId ${clientId}`
        }
      />
    );

  return (
    <React.Fragment>
      {createInvoice || updateInvoice ? (
        <React.Fragment>
          <AddNewInvoice
            clientId={clientId}
            update={updateInvoice ? updateInvoice : false}
            type="client"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ClientInfo profile={singleClientOverView?.profile} />
          <ClientOverView />
          <div className="space-y-6">
            <Tab />
            <React.Fragment>
              <ClientDetailsLayout clientId={clientId} />
            </React.Fragment>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ClientDetails;
