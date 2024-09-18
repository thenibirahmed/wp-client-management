import { useQuery } from "react-query";
import api from "../api/api";
import { useQueryClient, useMutation } from "react-query";
export const useFetchClientOverView = (onError) => {
  return useQuery(
    "client-overview",
    async () => {
      return await api.get(`/clients-overview`);
    },
    {
      select: (data) => {
        const sendData = {
          topBar: data.data.topBar,
        };

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};
export const useFetchClients = (pageinationUrl, onError) => {
  return useQuery(
    "clients",
    async () => {
      return await api.get(`/clients/?${pageinationUrl}`);
    },
    {
      select: (data) => {
        const sendData = {
          clients: data.data.clients,
          pagination: data.data.pagination,
        };

        return sendData;
      },
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

export const useFetchProjectEditDetails = (id, update, onError) => {
  return useQuery(
    ["client-project-edit-details", id],
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
        const { id, client_id, project_id } = data.data.note;

        return { id, client_id, project_id };
      },
      enabled: !!id && update,
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchSingleClientOverView = (clientId, onError) => {
  return useQuery(
    ["single-client-overview", clientId],
    async () => {
      return await api.get(`/client/${clientId}/overview`);
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

export const useFetchClientProject = (clientId, paginationUrl, onError) => {
  return useQuery(
    ["client-projects", clientId],
    async () => {
      return await api.get(`/client/${clientId}/projects/?${paginationUrl}`);
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

export const useFetchAllProjects = (pageinationUrl, onError) => {
  return useQuery(
    "projects",
    async () => {
      return await api.get(`/projects/?${pageinationUrl}`);
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

export const useFetchProjectOverView = (onError) => {
  return useQuery(
    "project-overview",
    async () => {
      return await api.get("/projects-overview");
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

export const useFetchSingleProjectOverView = (projectId, onError) => {
  return useQuery(
    ["single-project-overview", projectId],
    async () => {
      return await api.get(`/project/${projectId}/overview`);
    },
    {
      select: (data) => {
        const sendData = {
          header: data.data.header,
          topBar: data.data.topBar,
        };

        return sendData;
      },
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

export const useFetchProjectTask = (projectId, pageinationUrl, onError) => {
  return useQuery(
    ["project-tasks", projectId],
    async () => {
      return await api.get(`/project/${projectId}/tasks/?${pageinationUrl}`);
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
  type,
  onError
) => {
  return useQuery(
    [`${type}-invoice`, projectId],
    async () => {
      return await api.get(`/${type}/${projectId}/invoices/?${paginationUrl}`);
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

export const useFetchProjectNotes = (id, pageinationUrl, type, onError) => {
  return useQuery(
    [`${type}-notes`, id],
    async () => {
      return await api.get(`/${type}/${id}/notes/?${pageinationUrl}`);
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
  type,
  onError
) => {
  return useQuery(
    [`${type}-files`, projectId],
    async () => {
      return await api.get(`/${type}/${projectId}/files/?${pageinationUrl}`);
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
  type,
  onError
) => {
  return useQuery(
    [`${type}-email`, projectId],
    async () => {
      return await api.get(`/${type}/${projectId}/emails/?${pageinationUrl}`);
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
          team: data.data.data,
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
          id: data.data.id,
          subject: data.data.subject,
          body: data.data.body,
          date: data.data.date,
          from: data.data.from,
        };

        return sendData;
      },
      enabled: !!emailId,
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
          id: data.data.id,
          subject: data.data.subject,
          body: data.data.body,
          date: data.data.date,
          from: data.data.from,
        };

        return sendData;
      },
      enabled: !!emailId,
      onError,
      staleTime: 5000,
    }
  );
};
