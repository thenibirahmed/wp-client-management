import React from "react";
import AddNewInvoiceForm from "./AddNewInvoiceForm";
import InvoiceItemTable from "./InvoiceItemTable";
import AddInvoiceNote from "./AddInvoiceNote";

const AddNewInvoice = () => {
  return (
    <div className="space-y-4">
      {/* <AddInvoiceHeader /> */}
      <AddNewInvoiceForm />
      <InvoiceItemTable />
      <AddInvoiceNote />
    </div>
  );
};

export default AddNewInvoice;
