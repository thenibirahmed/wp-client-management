import React, { useState, useEffect } from "react";

import ClientOverView from "./ClientOverView";
import ClientInfo from "./ClientInfo";

import Tab from "./Tabs";
import ClientDetailsLayout from "./ClientDetailsLayout";
import { useStoreContext } from "../../store/ContextApiStore";
import ClientAddNewInvoice from "./ClientInvoices/AddNewInvoice/ClientAddNewInvoice";

const ClientDetails = () => {
  const { createInvoice, setCreateInvoice } = useStoreContext();

  return (
    <React.Fragment>
      {!createInvoice ? (
        <React.Fragment>
          <ClientInfo />
          <ClientOverView />
          <div className="space-y-6">
            <Tab />
            <React.Fragment>
              <ClientDetailsLayout />
            </React.Fragment>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ClientAddNewInvoice />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ClientDetails;
