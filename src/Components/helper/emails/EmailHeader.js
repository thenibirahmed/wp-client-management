import React from "react";

import {
  Delete03Icon,
  Mail02Icon,
  MultiplicationSignIcon,
  Search01Icon,
} from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";

const EmailHeader = ({ selectedEmail, onDeleteAction, onEmailBox }) => {
  const { createEmail, setCreateEmail } = useStoreContext();
  return (
    <div className="flex lg:flex-row  lg:justify-between flex-col lg:items-center lg:gap-0 gap-4">
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        Email
      </h1>
      <div className="flex sm:flex-row flex-wrap gap-5 items-center">
        {selectedEmail?.length > 0 && (
          <>
            <button onClick={() => onEmailBox(selectedEmail)}>
              <Mail02Icon className="text-textColor2" />
            </button>
            <button onClick={() => onDeleteAction(selectedEmail)}>
              <Delete03Icon className="text-textColor2" />
            </button>
          </>
        )}
        <Search01Icon />
        {createEmail ? (
          <>
            <button
              onClick={() => setCreateEmail(false)}
              type="button"
              className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[8px] px-4 text-sm font- flex items-center gap-[5px]`}
            >
              <MultiplicationSignIcon className="text-textColor2" />
              <span className="mt-[1px]">Cancel</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setCreateEmail(true)}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-customBlue px-5 py-[11px] text-sm font-semibold text-white shadow-sm  hover:text-gray-200 "
          >
            <Mail02Icon
              aria-hidden="true"
              className="text-white hover:text-gray-200 w-4 h-4"
            />
            Write Email
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailHeader;
