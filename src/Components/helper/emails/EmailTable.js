import React, { useState, useEffect } from "react";

import useHashRouting from "../../../utils/useHashRouting";
import {
  Delete03Icon,
  PencilEdit02Icon,
  Task01Icon,
  ViewIcon,
} from "../../../utils/icons";

import useCheckedHandler from "../../../utils/useCheckedItem";
import truncateText from "../../../utils/truncateText";
import { useStoreContext } from "../../../store/ContextApiStore";
import Pagination from "../../Clients/Pagination";
import Modal from "../Modal";
import ViewEmail from "./ViewEmail";

import { DeleteModal } from "../../DeleteModal";

const EmailTable = ({
  emailsData,
  pagination,
  projectId,
  slug,
  refetch,
  selectedEmail,
  setSelectedEmail,
  isAllselected,
  setIsAllSelected,
}) => {
  const {
    openEmailModal,
    setOpenEmailModal,
    deleteEmail,
    setDeleteEmail,
    setSelectedViewEmail,
  } = useStoreContext();

  const [emailId, setEmailId] = useState();

  const { checkedSingleClient, checkedAllClient } = useCheckedHandler(
    selectedEmail,
    setIsAllSelected,
    setSelectedEmail
  );

  const viewEmailHandler = (emailId) => {
    const findEmail = emailsData?.find((email) => email.id === emailId);

    setSelectedViewEmail(findEmail);
  };

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1  ring-black ring-opacity-5 sm:rounded-lg">
            <table className="xl:min-w-full min-w-[900px] divide-y divide-borderColor ">
              <thead className="bg-gray-50  ">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5  w-10  pl-4 pr-0 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    <input
                      checked={
                        selectedEmail?.length > 0 && isAllselected
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        checkedAllClient(e.target.checked, emailsData)
                      }
                      type="checkbox"
                    />
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 uppercase   pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    From
                  </th>
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    Email
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {emailsData?.map((item) => {
                  const isChecked = selectedEmail?.some(
                    (client) => client?.id === item?.id
                  );

                  return (
                    <tr>
                      <td className="whitespace-nowrap pl-4 sm:pl-6  py-4 text-sm text-textColor font-metropolis font-normal">
                        <input
                          checked={isChecked}
                          onChange={(e) =>
                            checkedSingleClient(e.target.checked, item)
                          }
                          type="checkbox"
                          className="border border-borderColor"
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6 ">
                        <div className="flex items-center  gap-3">
                          <img
                            className="h-7 w-7 rounded-full bg-gray-50"
                            src={
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                            alt={item.from}
                          />
                          <div>
                            <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                              {item.from}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 space-y-1  text-textColor2 font-metropolis font-normal text-sm">
                        <h3 className="text-sm   text-textColor font-metropolis font-normal ">
                          {item.subject}
                        </h3>{" "}
                        <h6
                          className="text-xs text-textColor2 font-metropolis font-normal"
                          dangerouslySetInnerHTML={{
                            __html: truncateText(item.body),
                          }}
                        ></h6>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor2 font-metropolis font-normal">
                        {item.time}
                      </td>
                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedViewEmail(item.id);
                              setOpenEmailModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <ViewIcon
                              className="text-textColor2"
                              width="20px"
                              height="20px"
                            />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEmailId(item?.id);
                              setDeleteEmail(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Delete03Icon
                              className="text-customRed"
                              width="20px"
                              height="20px"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              pagination={pagination}
              slug={slug}
              query="/?email"
              projectId={projectId}
            />
          </div>
        </div>
        <Modal
          open={openEmailModal}
          setOpen={setOpenEmailModal}
          title="How a visual artist redefines success"
        >
          <ViewEmail />
        </Modal>
      </div>

      <DeleteModal
        open={deleteEmail}
        setOpen={setDeleteEmail}
        id={emailId}
        refetch={refetch}
        path="email"
        title="Delete Email"
      />
    </div>
  );
};

export default EmailTable;
