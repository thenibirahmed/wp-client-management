import React, { useState, useEffect } from "react";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  Invoice01Icon,
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
import { useFetchClientOverView } from "../../hooks/useQuery";
import toast from "react-hot-toast";
import Skeleton from "../Skeleton";
import Errors from "../Errors";
import useHashRouting from "../../utils/useHashRouting";
import { useRefetch } from "../../hooks/useRefetch";

const Client = () => {
  const currentPath = useHashRouting("");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "page=1";

  const { setCreateInvoice, setAllTabItems } = useStoreContext();
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const {
    isLoading,
    data: clientOverView,
    error,
    refetch,
  } = useFetchClientOverView(paginationUrl, onError);

  useRefetch(paginationUrl, refetch);

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

  const addNewClient = () => {
    setOpen(true);
  };

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

  const onDeleteAction = (ids) => {
    alert(ids[0].client_id);
  };
  const onCheckAction = (ids) => {
    alert(ids[0].client_id);
  };

  return (
    <React.Fragment>
      <ClientOverView topBarData={clientOverView?.topBar} />
      <div className="space-y-6">
        <div className="flex md:flex-row  md:justify-between flex-col md:items-center md:gap-0 gap-4">
          <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
            All Clients
          </h1>
          <div className="flex sm:flex-row flex-wrap gap-5 items-center">
            {selectedClient.length > 0 && (
              <>
                {" "}
                <button onClick={() => onDeleteAction(selectedClient)}>
                  <Delete03Icon className="text-textColor2" />
                </button>
                <button onClick={() => onCheckAction(selectedClient)}>
                  <CheckmarkCircle02Icon className="text-textColor2" />
                </button>
              </>
            )}
            <ClientSearchInput />
            <button
              onClick={() => setOpen(true)}
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
          {clientOverView.clients.length > 0 ? (
            <>
              <ClientTable
                clientData={clientOverView?.clients}
                pagination={clientOverView?.pagination}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                isAllselected={isAllselected}
                setIsAllSelected={setIsAllSelected}
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
      <Modal open={open} setOpen={setOpen} title="Add Client">
        <AddClientForm setOpen={setOpen} refetch={refetch} />
      </Modal>
    </React.Fragment>
  );
};

export default Client;
