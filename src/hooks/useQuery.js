import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchAllClients = (onError) => {
  return useQuery(
    "all-clients",
    async () => {
      return await api.get("/clients");
    },
    {
      // select: (data) => {
      //   const sortedData = data.data.sort(
      //     (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      //   );
      //   return sortedData;
      // },
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
