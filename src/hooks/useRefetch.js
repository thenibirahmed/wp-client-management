import React, { useEffect } from "react";

export const useRefetch = (paginationUrl, refetch) => {
  useEffect(() => {
    const refetchHandler = async () => {
      await refetch();
    };

    if (paginationUrl) {
      refetchHandler();
    }
  }, [paginationUrl]);
};
export const useUpdateDefaultValue = (update, client, setValue) => {
  useEffect(() => {
    if (update && client) {
      const {
        name,
        email,
        id,
        address,
        city,
        country,
        organization,
        phone,
        state,
        zip,
      } = client;

      setValue("name", name);
      setValue("email", email);
      setValue("address", address);
      setValue("city", city);
      setValue("country", country);
      setValue("organization", organization);
      setValue("phone", phone);
      setValue("state", state);
      setValue("zip", zip);
    }
  }, [update, client]);
};
