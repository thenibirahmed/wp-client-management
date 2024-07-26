import React from "react";
import { useStoreContext } from "../../../store/ContextApiStore";

const ClientViewEmail = () => {
  const { selectedViewEmail } = useStoreContext();

  return <div>{selectedViewEmail.id}</div>;
};

export default ClientViewEmail;
