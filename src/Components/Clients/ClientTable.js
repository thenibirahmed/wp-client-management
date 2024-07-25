import React, { useState, useEffect } from "react";
import { Delete03Icon, PencilEdit02Icon, Task01Icon } from "../../utils/icons";
import useHashRouting from "../../utils/useHashRouting";
import Pagination from "./Pagination";
import useCheckedHandler from "../../utils/useCheckedItem";

const tableData = [
  {
    id: 1,
    name: "Easin",
    position: "CEO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: "easin@gmail.com",
    project: "02",
    invoice: 2500,
    revenue: 35,
    due: 72,
  },
  {
    id: 2,
    name: "Tanvir",
    position: "CEO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: "tanvir@gmail.com",
    project: "03",
    invoice: 3200,
    revenue: 25,
    due: 77,
  },
  {
    id: 3,
    name: "Easin",
    position: "CEO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: "easin@gmail.com",
    project: "02",
    invoice: 2500,
    revenue: 35,
    due: 72,
  },
  {
    id: 4,
    name: "Tanvir",
    position: "CEO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: "tanvir@gmail.com",
    project: "03",
    invoice: 3200,
    revenue: 25,
    due: 77,
  },
];

const ClientTable = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const [selectedClient, setSelectedClient] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const { checkedAllClient, checkedSingleClient } = useCheckedHandler(
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
            <table className="min-w-full divide-y divide-borderColor ">
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
                        checkedAllClient(e.target.checked, tableData)
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
                {tableData.map((item) => {
                  const isChecked = selectedClient.some(
                    (client) => client.id === item.id
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
                            src={item.image}
                            alt={item.name}
                          />
                          <div>
                            <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                              {item.name}
                            </h3>
                            <span className="text-xs  text-textColor2 font-metropolis font-normal leading-3">
                              {item.position}
                            </span>
                          </div>
                        </div>
                      </td>{" "}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor font-metropolis font-normal">
                        {item.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor font-metropolis font-normal">
                        {item.project}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4  text-invoiceColor font-metropolis font-medium text-sm">
                        ${item.invoice}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-invoiceColor font-metropolis font-medium">
                        ${item.revenue}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-customRed font-metropolis font-medium">
                        ${item.due}
                      </td>
                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <a
                            href={`/admin/#/clients/#/${item.name}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <PencilEdit02Icon
                              className="text-textColor2"
                              width="20px"
                              height="20px"
                            />
                          </a>
                          <a
                            href=""
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

                {/* <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-textColor2 sm:pl-6">
                    Lindsay Walton
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    easin@gmail.com
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    01
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    $2500
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    $350
                  </td>{" "}
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    $350
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      edit
                    </a>
                  </td>
                </tr> */}
                {/* More people... */}
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
