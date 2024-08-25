import React, { useEffect } from "react";

import { useStoreContext } from "../../../store/ContextApiStore";

import InvoiceTable from "../../helper/invoices/InvoiceTable";
import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon } from "../../../utils/icons";
import InvoiceHeader from "../../helper/invoices/InvoiceHeader";

const ProjectInvoice = () => {
  const { setCreateInvoice } = useStoreContext();
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

export default ProjectInvoice;
