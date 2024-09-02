import React, { useState, useEffect } from "react";

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

const ClientDetails = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");

  console.log("currentPath", currentPath);
  console.log("pathArray = ", pathArray);

  const { createInvoice } = useStoreContext();
  const {
    isLoading,
    data: singleClientOverView,
    error,
  } = useFetchSingleClientOverView(pathArray[1], onError);

  console.log("singleClientOverView", singleClientOverView);

  function onError(err) {
    toast.error(err?.response?.data?.errors?.id[0]);
    console.log(err);
  }

  if (isLoading) return <Skeleton />;

  if (error) return <Errors message={error?.response?.data?.errors?.id[0]} />;

  return (
    <React.Fragment>
      {!createInvoice ? (
        <React.Fragment>
          <ClientInfo profile={singleClientOverView?.profile} />
          <ClientOverView topBarData={singleClientOverView?.topBar} />
          <div className="space-y-6">
            <Tab />
            <React.Fragment>
              <ClientDetailsLayout />
            </React.Fragment>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <AddNewInvoice />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ClientDetails;
