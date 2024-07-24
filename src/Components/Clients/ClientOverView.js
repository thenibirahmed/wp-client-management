import React from "react";
import { OvierViewItem } from "./OverViewItem";

const ClientOverView = () => {
  return (
    <React.Fragment>
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        Clients Overview
      </h1>
      <div className="flex   w-full  sm:flex-row flex-col  sm:justify-between  items-center border border-borderColor rounded-lg">
        <OvierViewItem title="Total Invoice" amount="12.4k" invoice={1} />
        <OvierViewItem title="Total Revenue" amount="17.8k" invoice={5} />
        <OvierViewItem title="Total Due" amount="25.6k" invoice={0} />
        <OvierViewItem title="Total Project" amount="12.3k" invoice={10} />
      </div>
    </React.Fragment>
  );
};

export default ClientOverView;
