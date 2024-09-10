import React, { useState } from "react";

import AddNewInvoiceForm from "./AddNewInvoiceForm";
import InvoiceItemTable from "./InvoiceItemTable";
import AddInvoiceNote from "./AddInvoiceNote";

const AddNewInvoice = () => {
  const [invoiceItem, setInvoiceItems] = useState([]);
  const [noteText, setNoteText] = useState("");

  return (
    <div className="space-y-4 pb-16">
      {/* <AddInvoiceHeader /> */}
      <AddNewInvoiceForm noteText={noteText} invoiceItem={invoiceItem} />
      <InvoiceItemTable
        invoiceItem={invoiceItem}
        setInvoiceItems={setInvoiceItems}
      />
      <AddInvoiceNote
        invoiceItem={invoiceItem}
        setInvoiceItems={setInvoiceItems}
        noteText={noteText}
        setNoteText={setNoteText}
      />
    </div>
  );
};

export default AddNewInvoice;
