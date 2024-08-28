import React from "react";
import { OvierViewItem } from "../helper/OverViewItem";

const ClientOverView = ({ overViewData }) => {
  return (
    <React.Fragment>
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        Clients Overview
      </h1>
      <div className="flex   w-full  sm:flex-row flex-col  sm:justify-between  items-center border border-borderColor rounded-lg">
        <OvierViewItem
          title={overViewData?.invoice?.name}
          amount={overViewData?.invoice?.amount}
          invoice={overViewData?.invoice?.subText}
        />
        <OvierViewItem
          title={overViewData?.revenue?.name}
          amount={overViewData?.revenue?.amount}
          invoice={overViewData?.revenue?.subText}
        />
        <OvierViewItem
          title={overViewData?.due?.name}
          amount={overViewData?.due?.amount}
          invoice={overViewData?.due?.subText}
        />
        <OvierViewItem
          title={overViewData?.project?.name}
          amount={overViewData?.project?.amount}
          invoice={overViewData?.project?.subText}
        />
      </div>
    </React.Fragment>
  );
};

export default ClientOverView;
