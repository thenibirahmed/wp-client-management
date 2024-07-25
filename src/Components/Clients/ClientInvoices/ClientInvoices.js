import React from "react";
import { useStoreContext } from "../../../store/ContextApiStore";
import ClientProjectTable from "../ClientProjects/ClientProjectTable";
import EmptyTable from "../../helper/EmptyTable";
import { ClientProjectModal } from "../ClientProjects/ClientProjectModal";
import { Invoice01Icon } from "../../../utils/icons";
import ClientInvoiceTable from "./ClientInvoiceTable";
import ClientInvoiceHeader from "./ClientInvoiceHeader";

const ClientInvoices = () => {
  const { openProjectModal, setOpenProjectModal } = useStoreContext();
  const dataList = [1];
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
            setOpenProjectModal={setOpenProjectModal}
            title="Invoices Await Creation"
            subtitle="Kick things off by making your first invoice!"
            btnText="Create Invoice"
          />
        </>
      )}
      <ClientProjectModal
        openProjectModal={openProjectModal}
        setOpenProjectModal={setOpenProjectModal}
      />
    </React.Fragment>
  );
};

export default ClientInvoices;
