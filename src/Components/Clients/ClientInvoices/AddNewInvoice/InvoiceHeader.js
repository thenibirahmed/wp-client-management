import React from "react";
import { useStoreContext } from "../../../../store/ContextApiStore";

const InvoiceHeader = () => {
  const { setCreateInvoice } = useStoreContext();
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        Invoices
      </h1>
      <div className="space-x-3">
        <button
          onClick={() => setCreateInvoice(false)}
          type="button"
          className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
        >
          Save and Send
        </button>
        <button
          type="submit"
          className={`font-metropolis rounded-[5px]  bg-customBlue text-white  py-[10px] px-4 text-sm font-medium`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default InvoiceHeader;
