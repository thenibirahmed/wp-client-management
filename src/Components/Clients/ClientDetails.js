import React, { useState, useEffect } from "react";

import ClientOverView from "./ClientOverView";
import ClientInfo from "./ClientInfo";
import ClientDetailsLayout from "./ClientDetailsLayout";
import { useStoreContext } from "../../store/ContextApiStore";
import Tab from "../helper/Tabs";
import AddNewInvoice from "../helper/invoices/addNewInvoice/AddNewInvoice";
import {
  useFetchSelectCurrency,
  useFetchSingleClientOverView,
} from "../../hooks/useQuery";
import Skeleton from "../Skeleton";
import useHashRouting from "../../utils/useHashRouting";
import toast from "react-hot-toast";
import Errors from "../Errors";
import dayjs from "dayjs";
import { useClientOverViewRefetch } from "../../hooks/useRefetch";

const extractProjectId = (url) => {
  const match = url.match(/clients\/#\/(\d+)/);
  return match ? match[1] : null;
};

const ClientDetails = () => {
  const [selectCurrency, setSelectCurrency] = useState();

  const {
    createInvoice,
    updateInvoice,
    dateRange,
    setDateRange,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
  } = useStoreContext();

  const currentPath = useHashRouting("");

  const clientId = extractProjectId(currentPath);

  const {
    isLoading,
    data: singleClientOverView,
    error,
    refetch,
  } = useFetchSingleClientOverView(
    clientId,
    dateFrom,
    dateTo,
    selectCurrency?.code,
    onError
  );

  useClientOverViewRefetch(dateFrom, dateTo, selectCurrency, refetch);

  const {
    isLoading: isLoadingSelectCurrency,
    data: currencyLists,
    error: selecturrencyErr,
  } = useFetchSelectCurrency(onError);

  useEffect(() => {
    if (currencyLists?.currency.length > 0) {
      const usdCurrency = currencyLists?.currency?.find(
        (item) => item.code === "BDT"
      );

      setSelectCurrency(usdCurrency);
    } else {
      setSelectCurrency({ name: " -No Currency- ", id: null });
    }
  }, [currencyLists]);

  if (isLoading || isLoadingSelectCurrency) return <Skeleton />;

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetchClientOverView data");
  }

  if (error || selecturrencyErr)
    return (
      <Errors
        message={
          error?.response?.data?.errors?.id[0] ||
          `Failed to fetch client Overview Data for ClientId ${clientId}`
        }
      />
    );

  return (
    <React.Fragment>
      {createInvoice || updateInvoice ? (
        <React.Fragment>
          <AddNewInvoice
            clientId={clientId}
            update={updateInvoice ? updateInvoice : false}
            type="client"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ClientInfo profile={singleClientOverView?.profile} />
          <ClientOverView
            dateRange={dateRange}
            setDateRange={setDateRange}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
          />
          <div className="space-y-6">
            <Tab />
            <React.Fragment>
              <ClientDetailsLayout clientId={clientId} />
            </React.Fragment>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ClientDetails;
