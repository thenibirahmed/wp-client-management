import React from "react";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  Invoice01Icon,
  UserAdd02Icon,
} from "../../../utils/icons";

import { useStoreContext } from "../../../store/ContextApiStore";
import { ClientInvoiceSearch } from "./ClientInvoiceSearch";
import ClientInvoiceFilter from "./ClientInvoiceFilter";

const ClientInvoiceHeader = () => {
  const { setCreateInvoice } = useStoreContext();
  return (
    <div className="flex lg:flex-row  lg:justify-between flex-col lg:items-center lg:gap-0 gap-4">
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        Invoices
      </h1>
      <div className="flex sm:flex-row flex-wrap gap-5 items-center">
        <button>
          <Delete03Icon className="text-textColor2" />
        </button>
        <button>
          <CheckmarkCircle02Icon className="text-textColor2" />
        </button>
        <ClientInvoiceFilter />

        <ClientInvoiceSearch />
        <button
          onClick={() => setCreateInvoice(true)}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-customBlue px-5 py-[10px] text-sm font-semibold text-white shadow-sm  hover:text-gray-200 "
        >
          <Invoice01Icon
            aria-hidden="true"
            className="text-white hover:text-gray-200 w-4 h-4"
          />
          Create Invoice
        </button>
      </div>
    </div>
  );
};

export default ClientInvoiceHeader;
