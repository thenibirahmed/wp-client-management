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

export const useUpdateDefaultFileValue = (update, client, setValue, type) => {
  useEffect(() => {
    if (update && client) {
      const { title, url, client_id, project_id } = client;

      if (type === "client") {
        setValue("client_id", client_id);
      } else {
        setValue("project_id", project_id);
      }

      setValue("title", title);
      setValue("url", url);
    }
  }, [update, client]);
};

export const useUpdateDefaultNoteValue = (
  update,
  client,
  type,
  setSelectedId
) => {
  useEffect(() => {
    if (update && client) {
      const { client_id, project_id } = client;

      if (type === "client") {
        setSelectedId(client_id);
      } else {
        setSelectedId(project_id);
      }
    }
  }, [update, client]);
};

export const useUpdateDefaultProjectValue = (
  update,
  client,
  setValue,
  type
) => {
  useEffect(() => {
    if (update && client) {
      const {
        id,
        assignee_ids,
        budget,
        client_id,
        currency_id,
        description,
        due_date,
        manager_id,
        priority_id,
        start_date,
        status_id,
        title,
      } = client;

      setValue("title", title);
      setValue("budget", budget);
      setValue("description", description);
    }
  }, [update, client]);
};
