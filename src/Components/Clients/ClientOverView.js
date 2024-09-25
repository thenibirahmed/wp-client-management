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

const ClientOverView = () => {
  const [selectCurrency, setSelectCurrency] = useState();

  console.log("selectCurrency = ", selectCurrency);
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(3, "month").toDate(),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;

  const dateStart = dayjs(startDate).format("YYYY-MM-DD");
  const dateEnd = dayjs(endDate).format("YYYY-MM-DD");

  const {
    isLoading,
    data: clientOverView,
    error,
    refetch,
  } = useFetchClientOverView(dateStart, dateEnd, selectCurrency?.code, onError);

  const {
    isLoading: isLoadingSelectCurrency,
    data: currencyLists,
    error: selecturrencyErr,
  } = useFetchSelectCurrency(onError);

  useClientOverViewRefetch(dateStart, dateEnd, selectCurrency, refetch);

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
    setSelectCurrency({ name: " -Select Currency-", id: null });
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

      <div className="flex   w-full  sm:flex-row flex-col  sm:justify-between  items-center border border-borderColor rounded-lg">
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
        />
      </div>
    </React.Fragment>
  );
};

export default ClientOverView;
