import React, { useState, useEffect } from "react";
import {
  Delete03Icon,
  PencilEdit02Icon,
  Task01Icon,
} from "../../../utils/icons";
import useHashRouting from "../../../utils/useHashRouting";
import Pagination from "../../Clients/Pagination";
import { useClientCheckedHandler } from "../../../utils/useCheckedItem";
import { useStoreContext } from "../../../store/ContextApiStore";
import { DeleteModal } from "../../DeleteModal";
import AddClientForm from "../../Clients/AddClientForm";
import Modal from "../Modal";

const ContactClientTable = ({
  clientData,
  pagination,
  selectedClient,
  setSelectedClient,
  isAllselected,
  setIsAllSelected,
  refetch,
}) => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");

  const [clientInfo, setClientInfo] = useState();
  const { updateClient, setUpdateClient, deleteClient, setDeleteClient } =
    useStoreContext();
  const { checkedAllClient, checkedSingleClient } = useClientCheckedHandler(
    selectedClient,
    setIsAllSelected,
    setSelectedClient
  );

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
                        checkedAllClient(e.target.checked, clientData)
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
                {clientData?.map((item) => {
                  const isChecked = selectedClient?.some(
                    (client) => client?.client_id === item?.client_id
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
                              {item.organization}
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
                        {item.created_at}
                      </td>

                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setUpdateClient(true);
                              setClientInfo(item);
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
                              setDeleteClient(true);
                              setClientInfo(item);
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
            <Pagination pagination={pagination} slug="contact" query="/?page" />
          </div>
        </div>
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
          clientId={clientInfo?.client_id}
        />
      </Modal>
      <DeleteModal
        open={deleteClient}
        setOpen={setDeleteClient}
        id={clientInfo?.client_id}
        refetch={refetch}
        title="Delete Client"
        path="client"
      />
    </div>
  );
};

export default ContactClientTable;
