import React, { useState, useEffect } from "react";

import { useStoreContext } from "../../../store/ContextApiStore";
import InvoiceTable from "../../helper/invoices/InvoiceTable";
import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon } from "../../../utils/icons";
import ProjectHeader from "../../helper/projects/ProjectHeader";
import { useFetchProjectInvoice } from "../../../hooks/useQuery";
import Skeleton from "../../Skeleton";
import useHashRouting from "../../../utils/useHashRouting";

const ProjectInvoice = ({ projectId }) => {
  const { setCreateInvoice } = useStoreContext();
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "invoice=1";

  const {
    isLoading: invoiceLoader,
    data: invoiceList,
    error: inoiceErr,
    refetch,
  } = useFetchProjectInvoice(projectId, paginationUrl, onError);

  useEffect(() => {
    const refetchHandler = async () => {
      await refetch();
    };

    if (paginationUrl) {
      refetchHandler();
    }
  }, [paginationUrl]);

  const handler = () => {
    setCreateInvoice(true);
  };
  const onDeleteAction = (ids) => {
    alert(ids[0].id);
  };
  const onCheckAction = (ids) => {
    alert(ids[0].id);
  };

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetch all project Invoice Data");
  }

  if (inoiceErr) {
    return (
      <Errors
        message={
          inoiceErr?.response?.data?.errors ||
          `Failed To Fetch Project inoice for projectId ${projectId}`
        }
      />
    );
  }

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

      {invoiceList?.invoices.length > 0 ? (
        <React.Fragment>
          {invoiceLoader ? (
            <Skeleton />
          ) : (
            <>
              <InvoiceTable
                invoiceList={invoiceList?.invoices}
                pagination={invoiceList?.pagination}
                projectId={projectId}
                selectedInvoices={selectedInvoices}
                setSelectedInvoices={setSelectedInvoices}
                isAllselected={isAllselected}
                setIsAllSelected={setIsAllSelected}
              />
            </>
          )}
        </React.Fragment>
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
