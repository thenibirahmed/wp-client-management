import React, { useState } from "react";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  UserAdd02Icon,
} from "../../utils/icons";
import InputField from "./InputField";
import { AddClientModal } from "./AddClientModal";
import { OvierViewItem } from "./OverViewItem";

const Client = () => {
  const [open, setOpen] = useState(false);

  const dataList = [];

  return (
    <div className="space-y-8">
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        Clients Overview
      </h1>

      <React.Fragment>
        <div className="flex   w-full  sm:flex-row flex-col  sm:justify-between  items-center border border-borderColor rounded-lg">
          <OvierViewItem title="Total Invoice" amount="12.4k" invoice={1} />
          <OvierViewItem title="Total Revenue" amount="17.8k" invoice={5} />
          <OvierViewItem title="Total Due" amount="25.6k" invoice={0} />
          <OvierViewItem title="Total Project" amount="12.3k" invoice={10} />
        </div>
      </React.Fragment>
      <React.Fragment>
        <div className="space-y-6">
          <>
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
                <InputField />
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
          </>

          <React.Fragment>
            {dataList.length > 0 ? (
              <>table</>
            ) : (
              <>
                {" "}
                <div className=" min-h-[400px] max-h-[380px] border border-borderColor flex justify-center items-center rounded-lg">
                  <div className="text-center">
                    <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
                      Clients Not Yet Registered
                    </h1>
                    <p className="text-textColor2 text-sm font-normal font-metropolis  mt-2">
                      Start building your client list.
                    </p>
                    <button
                      onClick={() => setOpen(true)}
                      className="border  mt-6  border-customBlue text-xs text-customBlue font-metropolis font-medium px-5 py-[10px]  rounded-[5px]"
                    >
                      Add Client
                    </button>
                  </div>
                </div>
              </>
            )}
          </React.Fragment>
        </div>
      </React.Fragment>
      <AddClientModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Client;
