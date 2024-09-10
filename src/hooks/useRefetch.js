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
