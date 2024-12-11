import React, { useEffect } from "react";

export const useRefetch = (
  paginationUrl,
  searchText,
  dateFrom,
  dateTo,
  selectStatus,
  selectPriority,
  refetch,
  selectCurrency = null,
  requiredId = false,
  clientId = null
) => {
  useEffect(() => {
    const refetchHandler = async () => {
      await refetch();
    };

    if (requiredId) {
      if (clientId) {
        if (
          paginationUrl ||
          searchText ||
          dateFrom ||
          dateTo ||
          selectStatus ||
          selectPriority ||
          selectCurrency
        ) {
          refetchHandler();
        }
      }
    } else {
      if (
        paginationUrl ||
        searchText ||
        dateFrom ||
        dateTo ||
        selectStatus ||
        selectPriority ||
        selectCurrency
      ) {
        refetchHandler();
      }
    }
  }, [
    paginationUrl,
    searchText,
    dateFrom,
    dateTo,
    selectStatus,
    selectPriority,
    selectCurrency,
    requiredId,
    clientId,
  ]);
};

export const useInvoiceRefetch = (paginationUrl, isFetching, refetch) => {
  useEffect(() => {
    const refetchHandler = async () => {
      await refetch();
    };

    if (paginationUrl) {
      refetchHandler();
    }

    if (isFetching) {
      refetchHandler();
    }
  }, [paginationUrl, isFetching]);
};

export const useUpdateDefaultValue = (
  update,
  client,
  setValue,
  setImageUrl
) => {
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
        image_url,
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
      setImageUrl(image_url);
    }
  }, [update, client]);
};

export const useUpdateDefaultFileValue = (update, client, setValue, type) => {
  useEffect(() => {
    if (update && client) {
      const { title, url, client_id, project_id, image_url } = client;

      if (type === "client") {
        setValue("client_id", client_id);
      } else {
        setValue("project_id", project_id);
      }

      setValue("title", title);
      setValue("url", url);
      setValue("image_url", image_url);
    }
  }, [update, client]);
};

export const useUpdateDefaultNoteValue = (
  update,
  client,
  type,
  setSelectedId,
  setEditorContent
) => {
  useEffect(() => {
    if (update && client) {
      const { client_id, project_id, note } = client;
      setEditorContent(note);
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
  setStartDate,
  setEndDate,
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
      setStartDate(start_date);
      setEndDate(due_date);
    }
  }, [update, client]);
};

export const useUpdateDefaultTaskValue = (
  update,
  task,
  setValue,
  setStartDate,
  setEndDate
) => {
  useEffect(() => {
    if (update && task) {
      const {
        id,
        assigned_to,
        description,
        end_date,
        start_date,
        priority_id,
        status_id,
        title,
      } = task;

      setValue("title", title);
      setValue("description", description);
      setStartDate(start_date);
      setEndDate(end_date);
    }
  }, [update, task]);
};

export const useUpdateDefaultInvoiceValue = (
  update,
  client,
  setValue,
  setInvoiceItems,
  setNoteText,
  setInvoiceDate,
  setDueDate,
  employeematch,
  clientMatch,
  type
) => {
  useEffect(() => {
    if (update && client) {
      const {
        id,
        client_id,
        project_id,
        currency_id,
        code,
        type,
        title,
        date,
        due_date,
        note,
        billing_address,
        billing_phone_number,
        billing_email,
        bill_from_address,
        bill_from_email,
        bill_from_phone_number,
        payment_method_id,
        status_id,
        sub_total,
        total,
        discount,
        tax,
        fee,
        invoice_items,
      } = client;

      const updateInvoice = invoice_items.map((data) => {
        return {
          itemDetails: data.details,
          invoice_id: data.id,
          quantity: data.quantity,
          rate: data.unit_price,
          discount: data.discount_value,
          discountType: data.discount_type,
          tax: data.tax_value,
          taxType: data.tax_type,
          total: data.line_total,
        };
      });
      setNoteText(note);
      setInvoiceItems(updateInvoice);
      setValue("invoicenumber", code);
      setValue("title", title);

      if (clientMatch) {
        setValue("caddress", billing_address);
        setValue("cphone", billing_phone_number);
        setValue("cemail", billing_email);
      }

      if (employeematch) {
        setValue("address", bill_from_address);
        setValue("phone", bill_from_phone_number);
        setValue("email", bill_from_email);
      }

      setInvoiceDate(new Date(date));
      setDueDate(new Date(due_date));
    }
  }, [update, client, employeematch, clientMatch]);
};

export const useClientOverViewRefetch = (
  dateStart,
  dateEnd,
  selectCurrency,
  refetch,
  isFetching = false,
  requiredId = false,
  clientId = null
) => {
  useEffect(() => {
    const refetchHandler = async () => {
      await refetch();
    };

    if (requiredId) {
      if (clientId) {
        if (dateStart || dateEnd || selectCurrency || isFetching) {
          refetchHandler();
        }
      }
    } else {
      if (dateStart || dateEnd || selectCurrency || isFetching) {
        refetchHandler();
      }
    }
  }, [dateStart, dateEnd, selectCurrency, isFetching, requiredId, clientId]);
};

export const useUpdateTeamValue = (update, editTeam, setValue) => {
  useEffect(() => {
    if (update && editTeam) {
      const {
        id,
        address,
        city,
        state,
        zip,
        country,
        designation,
        phone,
        name,
        email,
      } = editTeam;

      setValue("name", name);
      setValue("email", email);
      setValue("address", address);
      setValue("city", city);
      setValue("country", country);
      setValue("designation", designation);
      setValue("phone", phone);
      setValue("state", state);
      setValue("zip", zip);
    }
  }, [update, editTeam]);
};
