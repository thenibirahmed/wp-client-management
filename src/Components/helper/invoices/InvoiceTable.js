import React, { useState, useEffect } from "react";

import useHashRouting from "../../../utils/useHashRouting";
import { Delete03Icon, PencilEdit02Icon } from "../../../utils/icons";

import Pagination from "../../Clients/Pagination";
import useCheckedHandler from "../../../utils/useCheckedItem";

const tableData = [
  {
    id: 1,
    invoiceId: "Inv-1231",
    clientName: "Easin Tanvir",
    total: 3500,
    status: "Completed",
    payMethod: "Cash",
    dueDate: "July 05, 2024",
  },
  {
    id: 2,
    invoiceId: "Inv-1232",
    clientName: "John Doe",
    total: 4500,
    status: "On Hold",
    payMethod: "Credit Card",
    dueDate: "July 06, 2024",
  },
  {
    id: 3,
    invoiceId: "Inv-1233",
    clientName: "Jane Smith",
    total: 2500,
    status: "Cancelled",
    payMethod: "Bank Transfer",
    dueDate: "July 07, 2024",
  },
  {
    id: 4,
    invoiceId: "Inv-1234",
    clientName: "Alice Johnson",
    total: 5500,
    status: "In progress",
    payMethod: "Paypal",
    dueDate: "July 08, 2024",
  },
  {
    id: 5,
    invoiceId: "Inv-1235",
    clientName: "Bob Brown",
    total: 1500,
    status: "In Review",
    payMethod: "Cash",
    dueDate: "July 09, 2024",
  },
];

const InvoiceTable = ({
  selectedInvoices,
  setSelectedInvoices,
  isAllselected,
  setIsAllSelected,
}) => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");

  const { checkedSingleClient, checkedAllClient } = useCheckedHandler(
    selectedInvoices,
    setIsAllSelected,
    setSelectedInvoices
  );

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
                        selectedInvoices?.length > 0 && isAllselected
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
                    className="py-3.5 uppercase   pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    invoice Id
                  </th>
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    client Name
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    total
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    status
                  </th>
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    pay Method
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    due Date
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
                  let itemStatus = item.status.toLowerCase();

                  const isChecked = selectedInvoices.some(
                    (client) => client.id === item.id
                  );

                  const statusClass =
                    itemStatus === "completed"
                      ? "bg-customBg1 text-green"
                      : itemStatus === "on hold"
                      ? "bg-customBg2 text-textColor"
                      : itemStatus === "cancelled"
                      ? "bg-customBg3 text-red2"
                      : itemStatus === "in progress"
                      ? "bg-customBg4 text-purple"
                      : itemStatus === "in review"
                      ? "bg-customBg5 text-customRed2"
                      : "";

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
                        <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                          {item.invoiceId}
                        </h3>
                      </td>{" "}
                      <td className="whitespace-nowrap px-3 py-4  text-textColor font-metropolis font-normal text-sm">
                        {item.clientName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4  text-textColor font-metropolis font-semibold text-sm">
                        ${item.total}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm  font-metropolis font-medium">
                        <span
                          className={`${statusClass} py-[2px] px-[10px] font-metropolis font-medium text-xs rounded-[5px]`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4  text-textColor font-metropolis font-normal text-sm">
                        {item.payMethod}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4  text-textColor font-metropolis font-normal text-sm">
                        {item.dueDate}
                      </td>
                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <a
                            href={``}
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
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
