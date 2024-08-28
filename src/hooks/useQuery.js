import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchAllClients = (onError) => {
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

export const useFetchTotalClicks = (token, onError) => {
  return useQuery(
    "url-totalclick",
    async () => {
      return await api.get(
        "/api/urls/totalclicks?startDate=2024-01-01&endDate=2024-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    },

    {
      select: (data) => {
        const convertToArray = Object.keys(data.data).map((key) => ({
          clickDate: key,
          count: data.data[key],
        }));

        return convertToArray;
      },
      onError,
      staleTime: 5000,
    }
  );
};
