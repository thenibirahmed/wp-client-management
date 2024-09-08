import React, { useState } from "react";

import { useStoreContext } from "../../../store/ContextApiStore";
import InvoiceTable from "../../helper/invoices/InvoiceTable";
import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon } from "../../../utils/icons";
import ProjectHeader from "../../helper/projects/ProjectHeader";

const ProjectInvoice = () => {
  const { setCreateInvoice } = useStoreContext();
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);
  const dataList = [1];

  const handler = () => {
    setCreateInvoice(true);
  };
  const onDeleteAction = (ids) => {
    alert(ids[0].id);
  };
  const onCheckAction = (ids) => {
    alert(ids[0].id);
  };

  return (
    <React.Fragment>
      <ProjectHeader
        selectedProject={selectedInvoices}
        title="Invoices"
        setOpenModal={setCreateInvoice}
        btnTitle="Create Invoice"
        onDeleteAction={onDeleteAction}
        onCheckAction={onCheckAction}
      />

      {dataList.length > 0 ? (
        <>
          <InvoiceTable
            selectedInvoices={selectedInvoices}
            setSelectedInvoices={setSelectedInvoices}
            isAllselected={isAllselected}
            setIsAllSelected={setIsAllSelected}
          />
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
