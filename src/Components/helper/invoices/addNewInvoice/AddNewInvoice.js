import React from "react";
import AddNewInvoiceForm from "./AddNewInvoiceForm";
import InvoiceItemTable from "./InvoiceItemTable";
import AddInvoiceHeader from "./AddInvoiceHeader";

const AddNewInvoice = () => {
  return (
    <div className="space-y-4">
      <AddInvoiceHeader />
      <AddNewInvoiceForm />
      <InvoiceItemTable />
    </div>
  );
};

export default AddNewInvoice;
