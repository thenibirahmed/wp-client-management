import React from "react";
import { useState, useEffect } from "react";

const useCheckedHandler = (
  selectedClient,
  setIsAllSelected,
  setSelectedClient
) => {
  const checkedAllClient = (checked, allClients) => {
    if (checked) {
      setIsAllSelected(true);
      setSelectedClient(allClients);
    } else {
      setIsAllSelected(false);
      setSelectedClient([]);
    }
  };
  const checkedSingleClient = (checked, newClient) => {
    const isItemExist = selectedClient.some(
      (client) => client.id === newClient.id
    );
    if (isItemExist) {
      const updateClient = selectedClient.filter(
        (client) => client.id !== newClient.id
      );

      setSelectedClient(updateClient);
    } else {
      setSelectedClient([...selectedClient, newClient]);
    }
  };

  useEffect(() => {
    if (selectedClient.length === 0) {
      setIsAllSelected(false);
    }
  }, [selectedClient]);

  return { checkedAllClient, checkedSingleClient };
};

export default useCheckedHandler;
