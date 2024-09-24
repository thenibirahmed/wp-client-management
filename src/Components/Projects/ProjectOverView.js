import React, { useState, useEffect } from "react";
import { OvierViewItem } from "../helper/OverViewItem";
import DateRangePicker from "../DateRangePicker";
import { Calendar02Icon } from "../../utils/icons";
import { SelectTextField } from "../helper/SelectTextField";
import { useFetchSelectCurrency } from "../../hooks/useQuery";
import toast from "react-hot-toast";
import ClearButton from "../ClearButton";

const ProjectOverView = ({ projectOverView, projectDetails = false }) => {
  const [selectCurrency, setSelectCurrency] = useState();
  const {
    isLoading: isLoadingSelectCurrency,
    data: currencyLists,
    error: selecturrencyErr,
  } = useFetchSelectCurrency(onError);

  function onError(err) {
    toast.error(err?.response?.data?.message?.errors || "Something went wrong");
    console.log(err);
  }

  useEffect(() => {
    if (currencyLists?.currency.length > 0) {
      setSelectCurrency(currencyLists?.currency[0]);
    } else {
      setSelectCurrency({ name: " -No Currency- ", id: null });
    }
  }, [currencyLists]);
  return (
    <React.Fragment>
      <div className="flex justify-between items-center ">
        <h1 className="font-metropolis w-fit  font-semibold  text-textColor text-2xl">
          Projects Overview
        </h1>

        <div className="w-fit flex items-center gap-2">
          <ClearButton />
          <DateRangePicker />
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
          title={projectOverView?.due?.name}
          amount={projectOverView?.due?.total}
          invoice={projectOverView?.due?.subText}
        />{" "}
        <OvierViewItem
          title={projectOverView?.invoice?.name}
          amount={projectOverView?.invoice?.total}
          invoice={projectOverView?.invoice?.subText}
        />
        {projectDetails ? (
          <OvierViewItem
            isProject
            title={projectOverView?.employee?.name}
            amount={projectOverView?.employee?.total}
            invoice={projectOverView?.employee?.subText}
          />
        ) : (
          <OvierViewItem
            isProject
            title={projectOverView?.projects?.name}
            amount={projectOverView?.projects?.count}
            invoice={projectOverView?.projects?.subText}
          />
        )}{" "}
        <OvierViewItem
          title={projectOverView?.revenue?.name}
          amount={projectOverView?.revenue?.total}
          invoice={projectOverView?.revenue?.subText}
        />
      </div>
    </React.Fragment>
  );
};

export default ProjectOverView;
