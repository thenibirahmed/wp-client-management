import React, { useState, useEffect } from "react";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  Invoice01Icon,
  UserAdd02Icon,
  UserCircle02Icon,
} from "../../utils/icons";
import { AddClientModal } from "./AddClientModal";
import ClientTable from "./ClientTable";
import EmptyTable from "../helper/EmptyTable";
import { ClientSearchInput } from "./SearchInput";
import ClientOverView from "./ClientOverView";
import { useStoreContext } from "../../store/ContextApiStore";

const Client = () => {
  const { setCreateInvoice } = useStoreContext();
  const [open, setOpen] = useState(false);

  const dataList = [1];

  useEffect(() => {
    setCreateInvoice(false);
  }, []);

  return (
    <React.Fragment>
      <ClientOverView />
      <div className="space-y-6">
        <div className="flex md:flex-row  md:justify-between flex-col md:items-center md:gap-0 gap-4">
          <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
            All Clients
          </h1>
          <div className="flex sm:flex-row flex-wrap gap-5 items-center">
            <button>
              <Delete03Icon className="text-textColor2" />
            </button>
            <button>
              <CheckmarkCircle02Icon className="text-textColor2" />
            </button>
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
          {dataList.length > 0 ? (
            <>
              <ClientTable />
            </>
          ) : (
            <>
              <EmptyTable
                Icon={UserCircle02Icon}
                setOpen={setOpen}
                title="  Clients Not Yet Registered"
                subtitle="Start building your client list."
                btnText=" Add Client"
              />
            </>
          )}
        </React.Fragment>
      </div>

      <AddClientModal open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export default Client;