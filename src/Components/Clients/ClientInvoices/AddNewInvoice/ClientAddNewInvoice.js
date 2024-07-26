import React from "react";
import AddNewInvoiceForm from "./AddNewInvoiceForm";
import InvoiceItemTable from "./InvoiceItemTable";
import InvoiceHeader from "./InvoiceHeader";

const ClientAddNewInvoice = () => {
  return (
    <div className="space-y-4">
      <InvoiceHeader />
      <AddNewInvoiceForm />
      <InvoiceItemTable />
    </div>
  );
};

export default ClientAddNewInvoice;
