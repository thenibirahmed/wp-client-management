import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  Delete03Icon,
  UserAdd02Icon,
  UserCircle02Icon,
} from "../../utils/icons";
import ClientTable from "./ClientTable";
import EmptyTable from "../helper/EmptyTable";
import { ClientSearchInput } from "./SearchInput";
import ClientOverView from "./ClientOverView";
import { useStoreContext } from "../../store/ContextApiStore";
import Modal from "../helper/Modal";
import AddClientForm from "./AddClientForm";
import { useBulkDelete, useFetchClients } from "../../hooks/useQuery";
import Skeleton from "../Skeleton";
import Errors from "../Errors";
import useHashRouting from "../../utils/useHashRouting";
import { useRefetch } from "../../hooks/useRefetch";
import Loaders from "../Loaders";

const Client = () => {
  const [loader, setLoader] = useState(false);
  const [selectCurrency, setSelectCurrency] = useState();

  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "page=1";

  const {
    setCreateInvoice,
    setAllTabItems,
    createClient,
    setCreateClient,
    updateClient,
    setUpdateClient,
    dateRange,
    setDateRange,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
  } = useStoreContext();

  const [selectedClient, setSelectedClient] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);
  const [searchText, setSearchText] = useState("");

  const {
    isLoading,
    data: clientList,
    error,
    refetch,
  } = useFetchClients(paginationUrl, searchText, dateFrom, dateTo, onError);

  useRefetch(paginationUrl, searchText, dateFrom, dateTo, null, null, refetch);

  const addNewClient = () => {
    setCreateClient(true);
  };

  const onDeleteAction = async (ids) => {
    await useBulkDelete("/clients/bulk-delete", ids, refetch, setLoader, true);
    setSelectedClient([]);
  };

  useEffect(() => {
    setCreateInvoice(false);
    setAllTabItems({
      project: true,
      task: true,
      invoice: false,
      note: false,
      file: false,
      email: false,
      info: false,
    });
  }, []);

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetchClientOverView data");
  }

  if (isLoading) return <Skeleton />;

  if (error)
    return (
      <Errors
        message={
          error?.response?.data?.errors?.id[0] ||
          "Failed to fetch Client Overview Data"
        }
      />
    );

  return (
    <React.Fragment>
      <ClientOverView
        dateRange={dateRange}
        setDateRange={setDateRange}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        setSearchText={setSearchText}
        setSelectStatus={() => {}}
        setSelectPriority={() => {}}
        setSelectedFilter={() => {}}
        selectCurrency={selectCurrency}
        setSelectCurrency={setSelectCurrency}
      />
      <div className="space-y-6">
        <div className="flex md:flex-row  md:justify-between flex-col md:items-center md:gap-0 gap-4">
          <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
            All Clients
          </h1>
          <div className="flex sm:flex-row flex-wrap gap-5 items-center">
            {selectedClient.length > 0 && (
              <>
                {loader && <Loaders />}
                <button
                  disabled={loader}
                  onClick={() => onDeleteAction(selectedClient)}
                >
                  <Delete03Icon
                    className={`text-customRed ${loader ? "opacity-50" : ""}`}
                  />
                </button>
              </>
            )}
            <ClientSearchInput
              setSearchText={setSearchText}
              searchText={searchText}
            />
            <button
              onClick={() => setCreateClient(true)}
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-customBlue px-5 py-[10px] text-sm font-semibold text-white shadow-sm  hover:text-gray-200 "
            >
              <UserAdd02Icon
                aria-hidden="true"
                className="text-white hover:text-gray-200"
              />
              Add Client
            </button>
          </div>
        </div>

        <React.Fragment>
          {clientList?.clients?.length > 0 ? (
            <>
              <ClientTable
                clientData={clientList?.clients}
                pagination={clientList?.pagination}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                isAllselected={isAllselected}
                setIsAllSelected={setIsAllSelected}
                refetch={refetch}
              />
            </>
          ) : (
            <>
              <EmptyTable
                Icon={UserCircle02Icon}
                handler={addNewClient}
                title="  Clients Not Yet Registered"
                subtitle="Start building your client list."
                btnText=" Add Client"
              />
            </>
          )}
        </React.Fragment>
      </div>
      <Modal open={createClient} setOpen={setCreateClient} title="Add Client">
        <AddClientForm setOpen={setCreateClient} refetch={refetch} />
      </Modal>
    </React.Fragment>
  );
};

export default Client;
