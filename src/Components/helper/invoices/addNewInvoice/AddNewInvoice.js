import React, { useState } from "react";

import AddNewInvoiceForm from "./AddNewInvoiceForm";
import InvoiceItemTable from "./InvoiceItemTable";
import AddInvoiceNote from "./AddInvoiceNote";

const AddNewInvoice = ({ update = false, clientId = null, type }) => {
  const [invoiceItem, setInvoiceItems] = useState([]);

  const [noteText, setNoteText] = useState("");

  return (
    <div className="space-y-4 pb-16">
      <AddNewInvoiceForm
        noteText={noteText}
        invoiceItem={invoiceItem}
        update={update}
        clientId={clientId}
        setInvoiceItems={setInvoiceItems}
        setNoteText={setNoteText}
        type={type}
      />
      <InvoiceItemTable
        invoiceItem={invoiceItem}
        setInvoiceItems={setInvoiceItems}
        update={update}
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
