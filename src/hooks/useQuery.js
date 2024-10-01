import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchClientOverView = (dateStart, dateEnd, code, onError) => {
  return useQuery(
    "clients-overview",
    async () => {
      const defaultCode = code || "BDT";

      const params = new URLSearchParams();
      params.append("currency", defaultCode);

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }

      const queryString = params.toString();
      const fullUrl = `/clients-overview?${queryString}`;

      return await api.get(fullUrl);
    },
    {
      select: (data) => ({
        topBar: data.data.topBar,
      }),
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchClients = (
  paginationUrl,
  searchText,
  dateStart,
  dateEnd,
  onError
) => {
  return useQuery(
    "clients",
    async () => {
      const params = new URLSearchParams();

      if (searchText) {
        params.append("search", searchText);
      }

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }

      const queryString = params.toString();
      const url = `/clients/?${paginationUrl}${
        queryString ? `&${queryString}` : ""
      }`;

      return await api.get(url);
    },
    {
      select: (data) => ({
        clients: data.data.clients,
        pagination: data.data.pagination,
      }),
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchSingleClientOverView = (
  clientId,
  dateStart,
  dateEnd,
  code,
  onError
) => {
  return useQuery(
    ["single-client-overview", clientId],
    async () => {
      const defaultcode = code ? code : "BDT";

      const params = new URLSearchParams();
      params.append("currency", defaultcode);

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }

      const queryString = params.toString();
      const fullUrl = `/client/${clientId}/overview?${queryString}`;

      return await api.get(fullUrl);
    },
    {
      select: (data) => {
        const sendData = {
          topBar: data.data.topBar,
          profile: data.data.profile,
        };

        return sendData;
      },
      enabled: !!clientId,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchClientEditDetails = (id, update, onError) => {
  return useQuery(
    ["client-edit-details", id],
    async () => {
      return await api.get(`/client/${id}/edit`);
    },
    {
      select: (data) => {
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
        } = data.data.client;

        return {
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
        };
      },
      enabled: !!id && update,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectEditDetails = (id, update, type, onError) => {
  return useQuery(
    [`${type}-project-edit-details`, id],
    async () => {
      return await api.get(`/project/${id}/edit`);
    },
    {
      select: (data) => {
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
        } = data.data.project;

        return {
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
        };
      },
      enabled: !!id && update,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchTaskEditDetails = (id, update, type, onError) => {
  return useQuery(
    [`project-task-edit-details`, id],
    async () => {
      return await api.get(`/task/${id}/edit`);
    },
    {
      select: (data) => {
        const {
          id,
          assigned_to,
          description,
          end_date,
          start_date,
          priority_id,
          status_id,
          title,
        } = data.data.task;

        return {
          id,
          assigned_to,
          description,
          end_date,
          start_date,
          priority_id,
          status_id,
          title,
        };
      },
      enabled: !!id && update,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchFileEditDetails = (id, update, onError) => {
  return useQuery(
    ["client-file-details", id],
    async () => {
      return await api.get(`/file/${id}/edit`);
    },
    {
      select: (data) => {
        const { id, client_id, project_id, title, url } = data.data.file;

        return { id, client_id, project_id, title, url };
      },
      enabled: !!id && update,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchNoteEditDetails = (id, update, onError) => {
  return useQuery(
    ["client-note-detail", id],
    async () => {
      return await api.get(`/note/${id}/edit`);
    },
    {
      select: (data) => {
        const { id, client_id, project_id, note } = data.data.note;

        return { id, client_id, project_id, note };
      },
      enabled: !!id && update,
      onError,
      staleTime: 5000,
    }
  );
};
export const useFetchInvoiceEditDetails = (id, update, onError) => {
  return useQuery(
    ["client-invoice-detail", id],
    async () => {
      return await api.get(`/invoice/${id}/edit`);
    },
    {
      select: (data) => {
        const {
          bill_from_id,
          bill_to_id,
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
        } = data.data.invoice;

        return {
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
          bill_from_id,
          bill_to_id,
        };
      },
      enabled: !!id && update,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchClientProject = (
  clientId,
  searchText,
  dateStart,
  dateEnd,
  selectStatus,
  selectPriority,
  paginationUrl,
  onError
) => {
  return useQuery(
    ["client-projects", clientId],
    async () => {
      const params = new URLSearchParams();

      if (searchText) {
        params.append("search", searchText);
      }

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }
      if (selectStatus) {
        params.append("status_id", selectStatus);
      }
      if (selectPriority) {
        params.append("priority_id", selectPriority);
      }

      const queryString = params.toString();

      const url = `/client/${clientId}/projects/?${paginationUrl}${
        queryString ? `&${queryString}` : ""
      }`;

      return await api.get(url);
    },
    {
      select: (data) => {
        const sendData = {
          projects: data.data.projects,
          pagination: data.data.pagination,
        };

        return sendData;
      },
      enabled: !!clientId,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectClients = (onError) => {
  return useQuery(
    "project-clients",
    async () => {
      return await api.get("/select-client");
    },

    {
      select: (data) => {
        const clients = data?.data?.clients?.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        });

        return {
          clients,
        };
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectManager = (onError) => {
  return useQuery(
    "project-manager",
    async () => {
      return await api.get("/select-project-manager");
    },

    {
      select: (data) => {
        const managers = data?.data?.managers?.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        });

        return {
          managers,
        };
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchPriorities = (type, onError) => {
  return useQuery(
    "project-priority",
    async () => {
      return await api.get(`/select/${type}/priority`);
    },

    {
      select: (data) => {
        const priorities = data?.data?.priorities?.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        });

        return {
          priorities,
        };
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchStatus = (type, onError) => {
  return useQuery(
    "project-status",
    async () => {
      return await api.get(`/select/${type}/status`);
    },

    {
      select: (data) => {
        const statuses = data?.data?.statuses?.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        });

        return {
          statuses,
        };
      },
      onError,

      staleTime: 5000,
    }
  );
};

export const useFetchAllProjects = (
  pageinationUrl,
  searchText,
  dateStart,
  dateEnd,
  selectStatus,
  selectPriority,
  onError
) => {
  return useQuery(
    "projects",
    async () => {
      const params = new URLSearchParams();

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }

      if (searchText) {
        params.append("search", searchText);
      }

      if (selectStatus) {
        params.append("status_id", selectStatus);
      }
      if (selectPriority) {
        params.append("priority_id", selectPriority);
      }

      const queryString = params.toString();

      const url = `/projects/?${pageinationUrl}${
        queryString ? `&${queryString}` : ""
      }`;

      return await api.get(url);
    },
    {
      select: (data) => {
        const sendData = {
          projects: data.data.projects,
          pagination: data.data.pagination,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectOverView = (dateStart, dateEnd, code, onError) => {
  return useQuery(
    "project-overview",
    async () => {
      const defaultCode = code || "BDT";

      const params = new URLSearchParams();
      params.append("currency", defaultCode);

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }

      const queryString = params.toString();
      const fullUrl = `/projects-overview?${queryString}`;

      return await api.get(fullUrl);
    },
    {
      select: (data) => {
        const sendData = {
          projectOverView: data.data.topBar,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchSingleProjectOverView = (
  projectId,
  dateStart,
  dateEnd,
  code,
  onError
) => {
  return useQuery(
    ["single-project-overview", projectId],
    async () => {
      const defaultCode = code ? code : "BDT";

      const params = new URLSearchParams();
      params.append("currency", defaultCode);

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }

      const queryString = params.toString();
      const fullUrl = `/project/${projectId}/overview?${queryString}`;

      return await api.get(fullUrl);
    },
    {
      select: (data) => {
        const sendData = {
          header: data.data.header,
          topBar: data.data.topBar,
        };

        return sendData;
      },
      enabled: !!projectId,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchAssignee = (onError) => {
  return useQuery(
    ["project-assignee"],
    async () => {
      return await api.get(`/select-employee`);
    },
    {
      select: (data) => {
        const sendData = {
          employee: data.data.employee,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectTask = (
  projectId,
  searchText,
  dateStart,
  dateEnd,
  selectStatus,
  selectPriority,
  pageinationUrl,
  onError
) => {
  return useQuery(
    ["project-tasks", projectId],
    async () => {
      const params = new URLSearchParams();

      if (searchText) {
        params.append("search", searchText);
      }

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }
      if (selectStatus) {
        params.append("status_id", selectStatus);
      }
      if (selectPriority) {
        params.append("priority_id", selectPriority);
      }

      const queryString = params.toString();

      const url = `/project/${projectId}/tasks/?${pageinationUrl}${
        queryString ? `&${queryString}` : ""
      }`;

      return await api.get(url);
    },
    {
      select: (data) => {
        const sendData = {
          task: data.data.tasks,
          pagination: data.data.pagination,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectInvoice = (
  projectId,
  paginationUrl,
  searchText,
  dateStart,
  dateEnd,
  selectStatus,
  selectPriority,
  type,
  onError
) => {
  return useQuery(
    [`${type}-invoice`, projectId],
    async () => {
      const params = new URLSearchParams();

      if (searchText) {
        params.append("search", searchText);
      }

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }
      if (selectStatus) {
        params.append("status_id", selectStatus);
      }
      if (selectPriority) {
        params.append("priority_id", selectPriority);
      }

      const queryString = params.toString();

      const url = `/${type}/${projectId}/invoices/?${paginationUrl}${
        queryString ? `&${queryString}` : ""
      }`;

      return await api.get(url);
    },
    {
      select: (data) => {
        console.log("client invoice ", data.data);
        const sendData = {
          invoices: data.data.invoices,
          pagination: data.data.pagination,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectNotes = (
  id,
  searchText,
  dateStart,
  dateEnd,
  pageinationUrl,
  type,
  onError
) => {
  return useQuery(
    [`${type}-notes`, id],
    async () => {
      const params = new URLSearchParams();

      if (searchText) {
        params.append("search", searchText);
      }

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }

      const queryString = params.toString();

      return await api.get(
        `/${type}/${id}/notes/?${pageinationUrl}${
          queryString ? `&${queryString}` : ""
        }`
      );
    },
    {
      select: (data) => {
        const sendData = {
          pagination: data.data.pagination,
          notes: data.data.notes,
        };

        return sendData;
      },
      enabled: !!id,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectFiles = (
  projectId,
  pageinationUrl,
  searchText,
  dateStart,
  dateEnd,
  type,
  onError
) => {
  return useQuery(
    [`${type}-files`, projectId],
    async () => {
      const params = new URLSearchParams();

      if (searchText) {
        params.append("search", searchText);
      }

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }

      const queryString = params.toString();

      return await api.get(
        `/${type}/${projectId}/files/?${pageinationUrl}${
          queryString ? `&${queryString}` : ""
        }`
      );
    },
    {
      select: (data) => {
        const sendData = {
          files: data.data.files,
          pagination: data.data.pagination,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectEmails = (
  projectId,
  pageinationUrl,
  searchText,
  dateStart,
  dateEnd,
  type,
  onError
) => {
  return useQuery(
    [`${type}-email`, projectId],
    async () => {
      const params = new URLSearchParams();

      if (searchText) {
        params.append("search", searchText);
      }

      if (dateStart && dateEnd) {
        params.append("from", dateStart);
        params.append("to", dateEnd);
      }

      const queryString = params.toString();

      return await api.get(
        `/${type}/${projectId}/emails/?${pageinationUrl}${
          queryString ? `&${queryString}` : ""
        }`
      );
    },
    {
      select: (data) => {
        const sendData = {
          pagination: data.data.pagination,
          emails: data.data.emails,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchSelectProjects = (onError) => {
  return useQuery(
    "select-projects",
    async () => {
      return await api.get("/select-project");
    },
    {
      select: (data) => {
        const sendData = {
          projects: data.data.projects,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};
export const useFetchSelectCurrency = (onError) => {
  return useQuery(
    "select-currency",
    async () => {
      return await api.get("/select-currency");
    },
    {
      select: (data) => {
        const sendData = {
          currency: data.data.currencies,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};
export const useFetchSelectPaymentMethod = (onError) => {
  return useQuery(
    "select-payment-method",
    async () => {
      return await api.get("/select-payment-method");
    },
    {
      select: (data) => {
        const sendData = {
          method: data.data.payment_methods,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchEmployeeDetails = (emplyoeeId, onError) => {
  return useQuery(
    ["employee-details", emplyoeeId],
    async () => {
      return await api.get(`/employee/${emplyoeeId}/details`);
    },
    {
      select: (data) => {
        const sendData = {
          employeeDetails: data.data.employee_details,
        };

        return sendData;
      },
      enabled: !!emplyoeeId,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchClientDetails = (clientId, onError) => {
  return useQuery(
    ["client-details", clientId],
    async () => {
      return await api.get(`/client/${clientId}/details`);
    },
    {
      select: (data) => {
        const sendData = {
          clientDetails: data.data.client_details,
        };

        return sendData;
      },
      enabled: !!clientId,
      onError,
      staleTime: 5000,
    }
  );
};
export const useFetchContactTeamMembers = (paginationUrl, onError) => {
  return useQuery(
    "contact-team-members",
    async () => {
      return await api.get(`/team-members/?${paginationUrl}`);
    },
    {
      select: (data) => {
        const sendData = {
          team: data.data.team_members,
          pagination: data.data.pagination,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchSingleTeamOverview = (teamId, onError) => {
  return useQuery(
    ["single-team-overview", teamId],
    async () => {
      return await api.get(`/team-member/${teamId}/overview`);
    },
    {
      select: (data) => {
        const sendData = {
          profile: data.data.profile,
          bottomTab: data.data.bottomTab,
        };

        return sendData;
      },
      enabled: !!teamId,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchSingleTeamProject = (teamId, paginationUrl, onError) => {
  return useQuery(
    ["single-team-projects", teamId],
    async () => {
      return await api.get(`/team-member/${teamId}/projects/?${paginationUrl}`);
    },
    {
      select: (data) => {
        console.log("projectTask", data.data);
        const sendData = {
          teamproject: data.data.projects,
          pagination: data.data.pagination,
        };

        return sendData;
      },
      enabled: !!teamId,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchSingleTeamTasks = (teamId, paginationUrl, onError) => {
  return useQuery(
    ["single-team-tasks", teamId],
    async () => {
      return await api.get(`/team-member/${teamId}/tasks/?${paginationUrl}`);
    },
    {
      select: (data) => {
        const sendData = {
          task: data.data.tasks,
          pagination: data.data.pagination,
        };

        return sendData;
      },
      enabled: !!teamId,
      onError,
      staleTime: 5000,
    }
  );
};
export const useFetchSingleEmailView = (emailId, onError) => {
  return useQuery(
    ["single-email-view", emailId],
    async () => {
      return await api.get(`/email/${emailId}`);
    },
    {
      select: (data) => {
        const sendData = {
          id: data.data.email.id,
          subject: data.data.email.subject,
          body: data.data.email.body,
          date: data.data.email.date,
          from: data.data.email.from,
        };

        return sendData;
      },

      onError,
      staleTime: 5000,
    }
  );
};
export const useFetchSingleTask = (taskId, onError) => {
  return useQuery(
    ["single-task-view", taskId],
    async () => {
      return await api.get(`/task/${taskId}`);
    },
    {
      select: (data) => {
        const sendData = {
          assignee_to: data.data.assignee_to,
          comments: data.data.comments,
          description: data.data.description,
          owner: data.data.owner,
          priority: data.data.priority,
          status: data.data.status,
          title: data.data.title,
        };

        return sendData;
      },
      enabled: !!taskId,
      onError,
      staleTime: 5000,
    }
  );
};
