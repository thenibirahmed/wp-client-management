import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchClientOverView = (onError) => {
  return useQuery(
    "client-overview",
    async () => {
      return await api.get("/client-overview");
    },
    {
      select: (data) => {
        const sendData = {
          clients: data.data.clients,
          pagination: data.data.pagination,
          topBar: data.data.topBar,
        };

        return sendData;
      },
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
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectClients = (onError) => {
  return useQuery(
    "project-clients",
    async () => {
      return await api.get("/select-project-client");
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

export const useFetchProjectPriorities = (onError) => {
  return useQuery(
    "project-priority",
    async () => {
      return await api.get("/select/project/priority");
    },

    {
      select: (data) => {
        //console.log("allprorities", data.data);

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

export const useFetchProjectStatus = (onError) => {
  return useQuery(
    "project-status",
    async () => {
      return await api.get("/select/project/status");
    },

    {
      select: (data) => {
        //console.log("allprorities", data.data);

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

export const useFetchAllProjects = (onError) => {
  return useQuery(
    "projects",
    async () => {
      return await api.get("/projects");
    },
    {
      select: (data) => {
        const sendData = {
          projects: data.data.projects,
          pagination: data.data.pagination,
        };

        console.log(sendData);

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
      return await api.get("/project-overview");
    },
    {
      select: (data) => {
        const sendData = {
          projectOverView: data.data.topBar,
        };

        console.log(sendData);

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

        console.log(sendData);

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};
