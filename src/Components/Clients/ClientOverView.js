import React, { useState, useEffect } from "react";
import { OvierViewItem } from "../helper/OverViewItem";
import ClearButton from "../ClearButton";
import DateRangePicker from "../DateRangePicker";
import { SelectTextField } from "../helper/SelectTextField";
import {
  useFetchClientOverView,
  useFetchSelectCurrency,
} from "../../hooks/useQuery";
import dayjs from "dayjs";
import { useClientOverViewRefetch } from "../../hooks/useRefetch";
import toast from "react-hot-toast";
import Errors from "../Errors";
import Skeleton from "../Skeleton";

const ClientOverView = ({
  dateRange,
  setDateRange,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  singleClient = false,
  topBar,
  setSearchText,
  setSelectStatus,
  setSelectPriority,
  setSelectedFilter,
  selectCurrency,
  setSelectCurrency,
}) => {
  const [startDate, endDate] = dateRange;

  const {
    isLoading,
    data: clientOverView,
    error,
    refetch,
  } = useFetchClientOverView(dateFrom, dateTo, selectCurrency?.code, onError);

  const {
    isLoading: isLoadingSelectCurrency,
    data: currencyLists,
    error: selecturrencyErr,
  } = useFetchSelectCurrency(onError);

  useClientOverViewRefetch(dateFrom, dateTo, selectCurrency, refetch);

  useEffect(() => {
    if (startDate && endDate && endDate !== "Invalid Date") {
      const dateStart = dayjs(startDate).format("YYYY-MM-DD");
      const dateEnd = dayjs(endDate).format("YYYY-MM-DD");
      setDateFrom(dateStart);
      setDateTo(dateEnd);
    }
  }, [dateRange]);

  function onError(err) {
    toast.error(err?.response?.data?.message?.errors || "Something went wrong");
    console.log(err);
  }

  useEffect(() => {
    if (currencyLists?.currency.length > 0) {
      const usdCurrency = currencyLists?.currency?.find(
        (item) => item.code === "USD"
      );

      setSelectCurrency(usdCurrency);
    } else {
      setSelectCurrency({ name: " -No Currency- ", id: null });
    }
  }, [currencyLists]);

  const clrearFilter = () => {
    setDateRange([dayjs().subtract(3, "month").toDate(), new Date()]);
    setDateFrom(null);
    setDateTo(null);
    const usdCurrency = currencyLists?.currency?.find(
      (item) => item.code === "USD"
    );

    setSelectCurrency(usdCurrency);
    setSearchText("");
    setSelectStatus("");
    setSelectPriority("");
    setSelectedFilter("Filter");
  };

  if (isLoading || isLoadingSelectCurrency) return <Skeleton />;

  if (error || selecturrencyErr)
    return (
      <Errors
        message={
          error?.response?.data?.errors?.id[0] ||
          "Failed to fetch Client Overview Data"
        }
      />
    );

  return (
    <React.Fragment>
      <div className="flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-3 ">
        <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
          Clients Overview
        </h1>

        <div className="sm:w-fit flex sm:flex-row flex-col  items-center gap-2 sm:justify-start justify-center w-full">
          <ClearButton onClick={clrearFilter} />
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <SelectTextField
            select={selectCurrency}
            setSelect={setSelectCurrency}
            lists={currencyLists?.currency}
            isSubmitting={false}
            currency
          />
        </div>
      </div>

      <div className="flex   w-full  md:flex-row flex-col  md:justify-between  items-center border border-borderColor rounded-lg">
        {singleClient ? (
          <>
            {" "}
            <OvierViewItem
              title={topBar?.invoice?.name}
              amount={topBar?.invoice?.amount}
              invoice={topBar?.invoice?.subText}
            />
            <OvierViewItem
              title={topBar?.revenue?.name}
              amount={topBar?.revenue?.amount}
              invoice={topBar?.revenue?.subText}
            />
            <OvierViewItem
              title={topBar?.due?.name}
              amount={topBar?.due?.amount}
              invoice={topBar?.due?.subText}
            />
            <OvierViewItem
              title={topBar?.project?.name}
              amount={topBar?.project?.amount}
              invoice={topBar?.project?.subText}
              isProject
            />
          </>
        ) : (
          <>
            {" "}
            <OvierViewItem
              title={clientOverView?.topBar?.invoice?.name}
              amount={clientOverView?.topBar?.invoice?.amount}
              invoice={clientOverView?.topBar?.invoice?.subText}
            />
            <OvierViewItem
              title={clientOverView?.topBar?.revenue?.name}
              amount={clientOverView?.topBar?.revenue?.amount}
              invoice={clientOverView?.topBar?.revenue?.subText}
            />
            <OvierViewItem
              title={clientOverView?.topBar?.due?.name}
              amount={clientOverView?.topBar?.due?.amount}
              invoice={clientOverView?.topBar?.due?.subText}
            />
            <OvierViewItem
              title={clientOverView?.topBar?.project?.name}
              amount={clientOverView?.topBar?.project?.amount}
              invoice={clientOverView?.topBar?.project?.subText}
              isProject
            />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default ClientOverView;
