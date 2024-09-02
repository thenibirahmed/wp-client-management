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

const ClientDetails = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");

  console.log("currentPath", currentPath);
  console.log("pathArray = ", pathArray);

  const { createInvoice } = useStoreContext();
  const { isLoading, data: singleClientOverView } =
    useFetchSingleClientOverView(pathArray[1], onError);

  console.log("singleClientOverView", singleClientOverView);

  function onError(err) {
    toast.error("Something went wrong Single ClientOverview");
    console.log(err);
  }

  if (isLoading) return <Skeleton />;

  return (
    <React.Fragment>
      {!createInvoice ? (
        <React.Fragment>
          <ClientInfo />
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
