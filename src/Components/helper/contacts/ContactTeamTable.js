import React, { useState } from "react";

import { Delete03Icon, PencilEdit02Icon } from "../../../utils/icons";
import Pagination from "../../Clients/Pagination";
import useCheckedHandler from "../../../utils/useCheckedItem";
import { DeleteModal } from "../../DeleteModal";
import Modal from "../Modal";
import AddContactTeamForm from "../../Contacts/Team/AddContactTeamForm";

const ContactTeamTable = ({
  teamLists,
  pagination,
  selectedClient,
  setSelectedClient,
  isAllselected,
  setIsAllSelected,
  refetch,
}) => {
  const { checkedAllClient, checkedSingleClient } = useCheckedHandler(
    selectedClient,
    setIsAllSelected,
    setSelectedClient
  );

  const [openContact, setOpenContact] = useState(false);
  const [contactId, setContactId] = useState();
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="xl:min-w-full min-w-[900px] divide-y divide-borderColor ">
              <thead className="bg-gray-50  ">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5  w-10  pl-4 pr-0 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    <input
                      checked={
                        selectedClient.length > 0 && isAllselected
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        checkedAllClient(e.target.checked, teamLists)
                      }
                      type="checkbox"
                    />
                  </th>
                  <th
                    scope="col"
                    className="py-3.5   pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    NAME
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    EMAIL
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    PHONE
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    CREATED DATE
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {teamLists?.map((item, i) => {
                  const isChecked = selectedClient.some(
                    (client) => client.id === item.id
                  );
                  return (
                    <tr
                      key={i}
                      className="cursor-pointer"
                      onClick={() =>
                        (window.location.href = `#/contact/#/${item.id}`)
                      }
                    >
                      <td
                        onClick={(e) => e.stopPropagation()}
                        className="whitespace-nowrap pl-4 sm:pl-6  py-4 text-sm text-textColor font-metropolis font-normal"
                      >
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
                        <div className="flex  gap-3">
                          <img
                            className="h-8 w-8 rounded-full bg-gray-50"
                            src={
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                            alt={item.name}
                          />
                          <div>
                            <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                              {item.name}
                            </h3>
                            <span className="text-xs  text-textColor2 font-metropolis font-normal leading-3">
                              {item.designation}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor font-metropolis font-normal">
                        {item.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor font-metropolis font-normal">
                        {item.phone}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor font-metropolis font-normal">
                        {item.created_date}
                      </td>

                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setContactId(item?.id);
                              setOpen(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <PencilEdit02Icon
                              className="text-textColor2"
                              width="20px"
                              height="20px"
                            />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setContactId(item?.id);
                              setOpenContact(true);
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
              slug="contact"
              query="/?member"
            />
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} title="Update Member">
        <AddContactTeamForm
          setOpen={setOpen}
          refetch={refetch}
          update={true}
          teamId={contactId}
        />
      </Modal>
      <DeleteModal
        open={openContact}
        setOpen={setOpenContact}
        id={contactId}
        refetch={refetch}
        path="team-member"
        title="Delete Contact Team"
      />
    </div>
  );
};

export default ContactTeamTable;
