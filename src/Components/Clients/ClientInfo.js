import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

import Modal from "../helper/Modal";
import { useStoreContext } from "../../store/ContextApiStore";
import {
  CallIcon,
  Location01Icon,
  Mail02Icon,
  PencilEdit02Icon,
} from "../../utils/icons";
import AddClientForm from "./AddClientForm";

const ClientInfo = ({ profile, clientId, refetch }) => {
  const { updateClient, setUpdateClient } = useStoreContext();

  const handleCopy = (label) => {
    toast.success(`${label} copied to clipboard!`, { position: "top-center" });
  };
  return (
    <div className="flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between sm:items-center pb-5 border-b border-b-borderColor">
      <div className="flex items-center gap-4">
        <div>
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div>
          <h1 className="font-metropolis font-semibold text-textColor text-3xl">
            {profile?.name}
          </h1>
          <div>
            <span className="text-xs text-textColor2 font-metropolis font-normal">
              {profile?.designation}
            </span>
            <span className="text-xs text-textColor2 font-metropolis font-normal">
              - {profile?.organization}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <CopyToClipboard text={profile?.phone || ""}>
          <span
            onClick={() => handleCopy("Phone Number")}
            data-tooltip-id="phone-tooltip"
            data-tooltip-content={profile?.phone || "No phone number"}
            className="cursor-pointer"
          >
            <CallIcon className="text-textColor2 hover:text-textColor" />
          </span>
        </CopyToClipboard>
        <Tooltip id="phone-tooltip" />

        <CopyToClipboard text={profile?.email || ""}>
          <span
            onClick={() => handleCopy("Email")}
            data-tooltip-id="email-tooltip"
            data-tooltip-content={profile?.email || "No email"}
            className="cursor-pointer"
          >
            <Mail02Icon className="text-textColor2 hover:text-textColor" />
          </span>
        </CopyToClipboard>
        <Tooltip id="email-tooltip" />

        <CopyToClipboard text={profile?.address || ""}>
          <span
            onClick={() => handleCopy("Address")}
            data-tooltip-id="address-tooltip"
            data-tooltip-content={profile?.address || "No address"}
            className="cursor-pointer"
          >
            <Location01Icon className="text-textColor2 hover:text-textColor" />
          </span>
        </CopyToClipboard>
        <Tooltip id="address-tooltip" />

        <button onClick={() => setUpdateClient(true)}>
          <PencilEdit02Icon className="text-textColor2 hover:text-textColor" />
        </button>
      </div>

      <Modal
        open={updateClient}
        setOpen={setUpdateClient}
        title="Update Client"
      >
        <AddClientForm
          refetch={refetch}
          setOpen={setUpdateClient}
          update
          clientId={clientId}
        />
      </Modal>
    </div>
  );
};

export default ClientInfo;
