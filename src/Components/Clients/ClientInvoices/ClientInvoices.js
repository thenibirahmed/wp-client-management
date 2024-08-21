import React from "react";
import { useStoreContext } from "../../../store/ContextApiStore";

import EmptyTable from "../../helper/EmptyTable";

import { Invoice01Icon } from "../../../utils/icons";

import InvoiceTable from "../../helper/invoices/InvoiceTable";
import InvoiceHeader from "../../helper/invoices/InvoiceHeader";

const ClientInvoices = () => {
  const { setCreateInvoice, createInvoice } = useStoreContext();
  const dataList = [1];

  const handler = () => {
    setCreateInvoice(true);
  };

  return (
    <React.Fragment>
      <InvoiceHeader />
      {dataList.length > 0 ? (
        <>
          <InvoiceTable />
        </>
      ) : (
        <>
          <EmptyTable
            Icon={Invoice01Icon}
            handler={handler}
            title="Invoices Await Creation"
            subtitle="Kick things off by making your first invoice!"
            btnText="Create Invoice"
          />
        </>
      )}
    </React.Fragment>
  );
};

export default ClientInvoices;
