import React, { useState } from "react";
import toast from "react-hot-toast";

import { useFetchEstimateInvoice } from "../../hooks/useQuery";
import useHashRouting from "../../utils/useHashRouting";
import InvoiceTable from "../helper/invoices/InvoiceTable";
import Skeleton from "../Skeleton";
import { useRefetch } from "../../hooks/useRefetch";
import Errors from "../Errors";

const Invoices = () => {
  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const paginationUrl = getPaginationUrl ? getPaginationUrl : "page=1";

  const {
    isLoading: invoiceLoader,
    data: invoiceList,
    error,
    refetch,
  } = useFetchEstimateInvoice(paginationUrl, onError);

  useRefetch(paginationUrl, null, null, null, null, null, refetch, null);

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetchClientOverView data");
  }

  if (error) {
    return (
      <Errors
        message={error?.response?.data?.errors || `Internal Server Error`}
      />
    );
  }

  return (
    <div>
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        All Invoices
      </h1>
      {invoiceList?.invoices.length > 0 ? (
        <React.Fragment>
          {invoiceLoader ? (
            <Skeleton />
          ) : (
            <>
              <InvoiceTable
                invoiceList={invoiceList?.invoices}
                pagination={invoiceList?.pagination}
                projectId={null}
                selectedInvoices={selectedInvoices}
                setSelectedInvoices={setSelectedInvoices}
                isAllselected={isAllselected}
                setIsAllSelected={setIsAllSelected}
                refetch={refetch}
                slug="invoices"
                isClient
                estimateInvoice
              />
            </>
          )}
        </React.Fragment>
      ) : (
        <>
          <div className=" min-h-[400px] max-h-[380px] border border-borderColor flex justify-center items-center rounded-lg">
            <div className="text-center">
              <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
                No Invoice Found{" "}
              </h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Invoices;
