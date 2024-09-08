import React, { useState } from "react";
import { Delete03Icon, PencilEdit02Icon } from "../../utils/icons";
import useHashRouting from "../../utils/useHashRouting";
import Pagination from "./Pagination";
import { useClientCheckedHandler } from "../../utils/useCheckedItem";

const ClientTable = ({ clientData }) => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const currentPageName = window.location.pathname.split("/")[1];

  console.log("currentPath =", currentPath);
  console.log("path = ", pathArray);
  const [selectedClient, setSelectedClient] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const { checkedAllClient, checkedSingleClient } = useClientCheckedHandler(
    selectedClient,
    setIsAllSelected,
    setSelectedClient
  );

  console.log(selectedClient);
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
                    # PROJECT(s)
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    INVOICE
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    REVENUE
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    DUE
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
                {clientData.map((item) => {
                  const isChecked = selectedClient.some(
                    (client) => client?.client_id === item?.client_id
                  );
                  return (
                    <tr
                      className="cursor-pointer"
                      onClick={() =>
                        (window.location.href = `#/clients/#/${item?.client_id}`)
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
                              {item.organization}
                            </span>
                          </div>
                        </div>
                      </td>{" "}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor font-metropolis font-normal">
                        {item.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor font-metropolis font-normal">
                        {item.project_count}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4  text-invoiceColor font-metropolis font-medium text-sm">
                        ${item.invoice.total}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-invoiceColor font-metropolis font-medium">
                        ${item.invoice.revenue}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-customRed font-metropolis font-medium">
                        ${item.invoice.due}
                      </td>
                      <td
                        onClick={(e) => e.stopPropagation()}
                        className="whitespace-nowrap   px-3 py-4 "
                      >
                        <div className="flex gap-3">
                          <a
                            href={`#/clients/#/${item?.client_id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <PencilEdit02Icon
                              className="text-textColor2"
                              width="20px"
                              height="20px"
                            />
                          </a>
                          <a
                            href={`#/clients/#/${item?.client_id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Delete03Icon
                              className="text-customRed"
                              width="20px"
                              height="20px"
                            />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTable;
