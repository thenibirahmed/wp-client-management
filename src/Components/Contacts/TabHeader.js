import React from "react";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  UserAdd02Icon,
} from "../../utils/icons";
import { ContactSearch } from "./ContactSearch";
import { useStoreContext } from "../../store/ContextApiStore";

const TabHeader = ({ setOpen, btn }) => {
  const { contactTabs } = useStoreContext();
  return (
    <div className="flex md:flex-row  md:justify-between flex-col md:items-center md:gap-0 gap-4">
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        {contactTabs["team"] ? "Team" : "Client"}
      </h1>
      <div className="flex sm:flex-row flex-wrap gap-5 items-center">
        <button>
          <Delete03Icon className="text-textColor2" />
        </button>
        <button>
          <CheckmarkCircle02Icon className="text-textColor2" />
        </button>
        <ContactSearch />
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
