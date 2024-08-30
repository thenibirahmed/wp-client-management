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

export const useFetchAllClients = (onError, onSuccess) => {
  return useQuery(
    "clients",
    async () => {
      return await api.get("/clients");
    },

    {
      select: (data) => {
        console.log("allclients", data.data);

        const clients = data?.data?.data?.map((item) => {
          return {
            id: item.client_id,
            name: item.name,
          };
        });

        return {
          clients,
          pagination: data.data.pagination,
        };
      },
      onError,
      onSuccess,
      staleTime: 5000,
    }
  );
};

export const useFetchAllPriorities = (onError, onSuccess) => {
  return useQuery(
    "priorities",
    async () => {
      return await api.get("/priorities");
    },

    {
      select: (data) => {
        //console.log("allprorities", data.data);

        const priorities = data?.data?.data?.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        });

        return {
          priorities,
          pagination: data.data.pagination,
        };
      },
      onError,
      onSuccess,
      staleTime: 5000,
    }
  );
};
