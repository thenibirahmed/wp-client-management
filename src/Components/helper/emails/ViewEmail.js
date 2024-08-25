import React from "react";
import { useStoreContext } from "../../../store/ContextApiStore";

const ViewEmail = () => {
  const { selectedViewEmail } = useStoreContext();

  return <div>{selectedViewEmail.id}</div>;
};

export default ViewEmail;
