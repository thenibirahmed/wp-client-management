import React, { useState } from "react";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  Invoice01Icon,
  UserAdd02Icon,
} from "../../utils/icons";

import { ClientProjectSearch } from "./ClientProjects/ClientProjectSearch";
import ClientProjectFilter from "./ClientProjects/ClientProjectFilter";

import ClientOverView from "./ClientOverView";
import ClientInfo from "./ClientInfo";

import Tab from "./Tabs";
import ClientDetailsLayout from "./ClientDetailsLayout";
import { useStoreContext } from "../../store/ContextApiStore";

const ClientDetails = () => {
  return (
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
  );
};

export default ClientDetails;
