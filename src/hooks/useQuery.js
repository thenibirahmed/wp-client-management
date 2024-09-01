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

export const useFetchProjectClients = (onError, onSuccess) => {
  return useQuery(
    "project-clients",
    async () => {
      return await api.get("/select-project-client");
    },

    {
      select: (data) => {
        console.log("all project clients", data.data);

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
      onSuccess,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectManager = (onError, onSuccess) => {
  return useQuery(
    "project-manager",
    async () => {
      return await api.get("/select-project-manager");
    },

    {
      select: (data) => {
        console.log("all project managers", data.data.managers);

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
      onSuccess,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectPriorities = (onError, onSuccess) => {
  return useQuery(
    "project-priority",
    async () => {
      return await api.get("/select-project-priority");
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
      onSuccess,
      staleTime: 5000,
    }
  );
};

export const useFetchProjectStatus = (onError, onSuccess) => {
  return useQuery(
    "project-status",
    async () => {
      return await api.get("/select-project-status");
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
      onSuccess,
      staleTime: 5000,
    }
  );
};
