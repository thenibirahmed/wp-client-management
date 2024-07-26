import React, { useEffect } from "react";
import { useStoreContext } from "../../../store/ContextApiStore";
import ClientProjectTable from "../ClientProjects/ClientProjectTable";
import EmptyTable from "../../helper/EmptyTable";
import { ClientProjectModal } from "../ClientProjects/ClientProjectModal";
import { Invoice01Icon } from "../../../utils/icons";
import ClientInvoiceTable from "./ClientInvoiceTable";
import ClientInvoiceHeader from "./ClientInvoiceHeader";

const ClientInvoices = () => {
  const { setCreateInvoice, createInvoice } = useStoreContext();
  const dataList = [1];

  const handler = () => {
    setCreateInvoice(true);
  };

  return (
    <React.Fragment>
      <ClientInvoiceHeader />
      {dataList.length > 0 ? (
        <>
          <ClientInvoiceTable />
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
