import React, { useState, useEffect } from "react";
import { OvierViewItem } from "../helper/OverViewItem";
import DateRangePicker from "../DateRangePicker";
import { Calendar02Icon } from "../../utils/icons";
import { SelectTextField } from "../helper/SelectTextField";
import {
  useFetchProjectOverView,
  useFetchSelectCurrency,
} from "../../hooks/useQuery";
import toast from "react-hot-toast";
import ClearButton from "../ClearButton";
import dayjs from "dayjs";
import { useClientOverViewRefetch } from "../../hooks/useRefetch";
import Errors from "../Errors";
import Skeleton from "../Skeleton";

const ProjectOverView = ({
  dateRange,
  setDateRange,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  setSelectStatus,
  setSelectPriority,
  projectDetails = false,
  topBar,
  setSearchText,
  selectCurrency,
  setSelectCurrency,
}) => {
  console.log("topBar", topBar);

  const [startDate, endDate] = dateRange;

  const {
    isLoading: projectOverViewLoader,
    data: projectOverView,
    error: projectOverViewError,
    refetch,
  } = useFetchProjectOverView(dateFrom, dateTo, selectCurrency?.code, onError);

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
    setSelectStatus("");
    setSelectPriority("");

    const usdCurrency = currencyLists?.currency?.find(
      (item) => item.code === "USD"
    );

    setSelectCurrency(usdCurrency);
    setSearchText("");
  };

  function onError(err) {
    toast.error(err?.response?.data?.message?.errors || "Something went wrong");
    console.log(err);
  }

  if (projectOverViewLoader || isLoadingSelectCurrency) return <Skeleton />;

  if (projectOverViewError || selecturrencyErr)
    return <Errors message={"Internal Server Error"} />;

  return (
    <React.Fragment>
      <div className="flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-3 ">
        <h1 className="font-metropolis w-fit  font-semibold  text-textColor text-2xl">
          Projects Overview
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
        {projectDetails ? (
          <>
            <OvierViewItem
              title={topBar?.due?.name}
              amount={topBar?.due?.total}
              invoice={topBar?.due?.subText}
            />{" "}
            <OvierViewItem
              title={topBar?.invoice?.name}
              amount={topBar?.invoice?.total}
              invoice={topBar?.invoice?.subText}
            />
            <OvierViewItem
              isProject
              title={topBar?.employee?.name}
              amount={topBar?.employee?.total}
              invoice={topBar?.employee?.subText}
            />
            <OvierViewItem
              title={topBar?.revenue?.name}
              amount={topBar?.revenue?.total}
              invoice={topBar?.revenue?.subText}
            />
          </>
        ) : (
          <>
            <OvierViewItem
              title={projectOverView?.projectOverView?.due?.name}
              amount={projectOverView?.projectOverView?.due?.total}
              invoice={projectOverView?.projectOverView?.due?.subText}
            />{" "}
            <OvierViewItem
              title={projectOverView?.projectOverView?.invoice?.name}
              amount={projectOverView?.projectOverView?.invoice?.total}
              invoice={projectOverView?.projectOverView?.invoice?.subText}
            />
            <OvierViewItem
              isProject
              title={projectOverView?.projectOverView?.projects?.name}
              amount={projectOverView?.projectOverView?.projects?.count}
              invoice={projectOverView?.projectOverView?.projects?.subText}
            />
            <OvierViewItem
              title={projectOverView?.projectOverView?.revenue?.name}
              amount={projectOverView?.projectOverView?.revenue?.total}
              invoice={projectOverView?.projectOverView?.revenue?.subText}
            />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProjectOverView;
