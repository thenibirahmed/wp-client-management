import React from "react";
import {
  Attachment02Icon,
  Image02Icon,
  Link05Icon,
  SignatureIcon,
} from "../../../utils/icons";

import ClientEmailTable from "./ClientEmailTable";

const AddNewEmail = () => {
  return (
    <div>
      <div className="border border-borderColor rounded-[8px] py-[13px] ">
        <EmailBox />
      </div>
      <ClientEmailTable />
    </div>
  );
};

export default AddNewEmail;

const EmailBox = () => {
  return (
    <>
      <div className="px-4">
        <input
          placeholder="To"
          type="text"
          className="w-full font-metropolis  px-1 py-1 outline-none text-textColor font-medium "
        />
        <input
          placeholder="Subject"
          type="text"
          className="w-full text-textColor2  font-metropolis font-normal border-b border-t border-borderColor px-1 py-2 outline-none"
        />
      </div>

      <textarea
        placeholder="write text here"
        className="w-full border-b border-b-borderColor  font-metropolis font-normal text-textColor2 px-4 outline-none  py-3"
        rows="5"
      ></textarea>

      <div className="px-4 flex justify-between items-center pt-1">
        <div className="flex gap-6">
          <button>
            <Attachment02Icon className="text-textColor2" />
          </button>
          <button>
            <Link05Icon className="text-textColor2" />
          </button>
          <button>
            <Image02Icon className="text-textColor2" />
          </button>{" "}
          <button>
            <SignatureIcon className="text-textColor2" />
          </button>
        </div>
        <button
          type="submit"
          className="font-metropolis rounded-[5px]  bg-customBlue text-white  py-[10px] px-[12px] text-xs font-medium"
        >
          Send Email
        </button>
      </div>
    </>
  );
};
