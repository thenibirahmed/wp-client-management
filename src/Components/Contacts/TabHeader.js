import React from "react";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  UserAdd02Icon,
} from "../../utils/icons";
import { ContactSearch } from "./ContactSearch";
import { useStoreContext } from "../../store/ContextApiStore";
import Loaders from "../Loaders";

const TabHeader = ({
  setOpen,
  btn,
  selectedClient,
  setSearchText,
  searchText,
  loader,
  onClick,
}) => {
  const { contactTabs } = useStoreContext();
  return (
    <div className="flex md:flex-row  md:justify-between flex-col md:items-center md:gap-0 gap-4">
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        {contactTabs["team"] ? "Team" : "Client"}
      </h1>
      <div className="flex sm:flex-row flex-wrap gap-5 items-center">
        {" "}
        {loader && <Loaders />}
        {selectedClient?.length > 0 && (
          <button disabled={loader} onClick={onClick}>
            <Delete03Icon className="text-customRed" />
          </button>
        )}
        {/* <button>
          <CheckmarkCircle02Icon className="text-textColor2" />
        </button> */}
        <ContactSearch setSearchText={setSearchText} searchText={searchText} />
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-customBlue px-5 py-[10px] text-sm font-semibold text-white shadow-sm  hover:text-gray-200 "
        >
          <UserAdd02Icon
            aria-hidden="true"
            className="text-white hover:text-gray-200"
          />
          {btn}
        </button>
      </div>
    </div>
  );
};

export default TabHeader;
