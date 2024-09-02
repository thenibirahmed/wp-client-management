import React from "react";
import { OvierViewItem } from "../helper/OverViewItem";

const ClientOverView = ({ topBarData }) => {
  return (
    <React.Fragment>
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        Clients Overview
      </h1>
      <div className="flex   w-full  sm:flex-row flex-col  sm:justify-between  items-center border border-borderColor rounded-lg">
        <OvierViewItem
          title={topBarData?.invoice?.name}
          amount={topBarData?.invoice?.amount}
          invoice={topBarData?.invoice?.subText}
        />
        <OvierViewItem
          title={topBarData?.revenue?.name}
          amount={topBarData?.revenue?.amount}
          invoice={topBarData?.revenue?.subText}
        />
        <OvierViewItem
          title={topBarData?.due?.name}
          amount={topBarData?.due?.amount}
          invoice={topBarData?.due?.subText}
        />
        <OvierViewItem
          title={topBarData?.project?.name}
          amount={topBarData?.project?.amount}
          invoice={topBarData?.project?.subText}
        />
      </div>
    </React.Fragment>
  );
};

export default ClientOverView;
