import React, { useState, useEffect } from "react";

import { useStoreContext } from "../../../store/ContextApiStore";
import EmptyTable from "../../helper/EmptyTable";
import { Invoice01Icon } from "../../../utils/icons";
import InvoiceTable from "../../helper/invoices/InvoiceTable";
import ProjectHeader from "../../helper/projects/ProjectHeader";
import {
  useBulkComplete,
  useBulkDelete,
  useFetchProjectInvoice,
  useFetchSelectCurrency,
} from "../../../hooks/useQuery";
import { useRefetch } from "../../../hooks/useRefetch";
import Errors from "../../Errors";
import useHashRouting from "../../../utils/useHashRouting";
import Skeleton from "../../Skeleton";
import { BulkDeleteModal } from "../../BulkDeleteModal";
import { BulkActionModal } from "../../BulkActionModal";

const ClientInvoices = ({ clientId }) => {
  const [loader, setLoader] = useState(false);
  const {
    setCreateInvoice,
    updateInvoice,
    setUpdateInvoice,
    dateFrom,
    dateTo,
    selectStatus,
    selectPriority,
    searchText,
    setSearchText,
    selectCurrency,
    setSelectCurrency,
    isFetching,
    setIsFetching,
    bulkDeleteClientInvoice,
    setBulkDeleteClientInvoice,
    bulkActionInvoice,
    setBulkActionInvoice,
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
    clientId,
    paginationUrl,
    searchText,
    dateFrom,
    dateTo,
    selectCurrency?.code,
    selectStatus,
    selectPriority,
    "client",
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
      false,
      setBulkDeleteClientInvoice
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
      false,
      setBulkActionInvoice
    );
    setSelectedInvoices([]);
  };

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetch all project Invoice Data");
  }

  if (isLoadingSelectCurrency) return <Skeleton />;

  if (inoiceErr || selecturrencyErr) {
    return (
      <Errors
        message={inoiceErr?.response?.data?.errors || `Internal Server Error`}
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
        setOpenBulkActionModal={setBulkDeleteClientInvoice}
        onCheckAction={onCheckAction}
        searchText={searchText}
        setSearchText={setSearchText}
        filter
        loader={loader}
        noPriority
        invoiceFilter
        setOpenBulkAction={setBulkActionInvoice}
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
                projectId={clientId}
                selectedInvoices={selectedInvoices}
                setSelectedInvoices={setSelectedInvoices}
                isAllselected={isAllselected}
                setIsAllSelected={setIsAllSelected}
                refetch={refetch}
                isClient
                slug="clients"
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

      <BulkDeleteModal
        loader={loader}
        open={bulkDeleteClientInvoice}
        setOpen={setBulkDeleteClientInvoice}
        onDeleteAction={() => onDeleteAction(selectedInvoices)}
        title="Delete Invoice"
      />

      <BulkActionModal
        loader={loader}
        open={bulkActionInvoice}
        setOpen={setBulkActionInvoice}
        onBulAction={() => onCheckAction(selectedInvoices)}
        title="Action"
      />
    </React.Fragment>
  );
};

export default ClientInvoices;
