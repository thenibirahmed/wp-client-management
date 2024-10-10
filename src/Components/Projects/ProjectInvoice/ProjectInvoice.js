import React, { useState, useEffect } from "react";

import { useStoreContext } from "../../../store/ContextApiStore";
import InvoiceTable from "../../helper/invoices/InvoiceTable";
import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon } from "../../../utils/icons";
import ProjectHeader from "../../helper/projects/ProjectHeader";
import {
  useBulkComplete,
  useBulkDelete,
  useFetchProjectInvoice,
  useFetchSelectCurrency,
} from "../../../hooks/useQuery";
import Skeleton from "../../Skeleton";
import useHashRouting from "../../../utils/useHashRouting";
import { useRefetch } from "../../../hooks/useRefetch";

const ProjectInvoice = ({ projectId }) => {
  const [loader, setLoader] = useState(false);
  const {
    setCreateInvoice,
    updateInvoice,
    setUpdateInvoice,
    dateFrom,
    dateTo,
    selectStatus,
    setSelectStatus,
    selectPriority,
    setSelectPriority,
    searchText,
    setSearchText,
    selectCurrency,
    setSelectCurrency,
    setIsFetching,
  } = useStoreContext();

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
  } = useFetchProjectInvoice(
    projectId,
    paginationUrl,
    searchText,
    dateFrom,
    dateTo,
    selectCurrency?.code,
    selectStatus,
    selectPriority,
    "project",
    onError
  );

  useRefetch(
    paginationUrl,
    searchText,
    dateFrom,
    dateTo,
    selectStatus,
    null,
    refetch,
    selectCurrency
  );

  const {
    isLoading: isLoadingSelectCurrency,
    data: currencyLists,
    error: selecturrencyErr,
  } = useFetchSelectCurrency(onError);

  useEffect(() => {
    if (currencyLists?.currency.length > 0) {
      const usdCurrency = currencyLists?.currency?.find(
        (item) => item.code === "USD"
      );

      setSelectCurrency(usdCurrency);
    } else {
      setSelectCurrency({ name: " -No Currency- ", id: null });
    }
  }, [currencyLists]);

  const handler = () => {
    setCreateInvoice(true);
  };
  const onDeleteAction = async (ids) => {
    setIsFetching(true);
    await useBulkDelete(
      "/invoices/bulk-delete",
      ids,
      refetch,
      setLoader,
      false
    );
    setSelectedInvoices([]);
    setIsFetching(false);
  };
  const onCheckAction = async (ids) => {
    await useBulkComplete(
      "/invoices/bulk-complete",
      ids,
      refetch,
      setLoader,
      false
    );
    setSelectedInvoices([]);
  };

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetch all project Invoice Data");
  }

  useEffect(() => {
    setUpdateInvoice(false);
  }, []);

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
        setOpenModal={updateInvoice ? setUpdateInvoice : setCreateInvoice}
        btnTitle="Create Invoice"
        onDeleteAction={onDeleteAction}
        onCheckAction={onCheckAction}
        searchText={searchText}
        setSearchText={setSearchText}
        filter
        loader={loader}
        noPriority
      />

      {invoiceList?.invoices.length > 0 ? (
        <React.Fragment>
          {invoiceLoader || isLoadingSelectCurrency ? (
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
                refetch={refetch}
                slug="projects"
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
