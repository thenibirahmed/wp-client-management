import React, { useState, useEffect } from "react";

import useHashRouting from "../../../utils/useHashRouting";
import {
  Delete03Icon,
  PencilEdit02Icon,
  Task01Icon,
} from "../../../utils/icons";
import RedCirlcle from "../../helper/RedCirlcle";
import SkyBlueCirle from "../../helper/SkyBlueCirle";
import YellowCirle from "../../helper/YellowCirle";
import Pagination from "../Pagination";
import useCheckedHandler from "../../../utils/useCheckedItem";

const tableData = [
  {
    id: 1,
    name: "Easin Ahmed",
    invoice: 2500,
    revenue: 35,
    due: 72,
    status: "Completed",
    priority: "High",
  },
  {
    id: 2,
    name: "Ahmed",

    invoice: 200,
    revenue: 5,
    due: 72,
    status: "On Hold",
    priority: "Low",
  },
  {
    id: 3,
    name: "Task",

    invoice: 200,
    revenue: 5,
    due: 72,
    status: "Cancelled",
    priority: "Medium",
  },
  {
    id: 4,
    name: "Mohahhamd",

    invoice: 200,
    revenue: 5,
    due: 72,
    status: "In progress",
    priority: "Low",
  },
  {
    id: 5,
    name: "Rifat",

    invoice: 200,
    revenue: 5,
    due: 72,
    status: "In Review",
    priority: "Low",
  },
];

const ClientProjectTable = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");

  const [selectedClient, setSelectedClient] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const { checkedSingleClient, checkedAllClient } = useCheckedHandler(
    selectedClient,
    setIsAllSelected,
    setSelectedClient
  );

  console.log(selectedClient);
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1  ring-black ring-opacity-5 sm:rounded-lg">
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
                    STATUS
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    PRORITY
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
                  let itemPriority = item.priority.toLowerCase();

                  const isChecked = selectedClient.some(
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
                          {item.name}
                        </h3>
                      </td>{" "}
                      <td className="whitespace-nowrap px-3 py-4  text-invoiceColor font-metropolis font-medium text-sm">
                        ${item.invoice}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-invoiceColor font-metropolis font-medium">
                        ${item.revenue}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-customRed font-metropolis font-medium">
                        ${item.due}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm  font-metropolis font-medium">
                        <span
                          className={`${statusClass} py-[2px] px-[10px] font-metropolis font-medium text-xs rounded-[5px]`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor font-metropolis font-medium">
                        <div className="flex items-center gap-2">
                          {itemPriority === "high" ? (
                            <RedCirlcle />
                          ) : itemPriority === "low" ? (
                            <SkyBlueCirle />
                          ) : itemPriority === "medium" ? (
                            <YellowCirle />
                          ) : (
                            <RedCirlcle />
                          )}
                          {item.priority}
                        </div>
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

export default ClientProjectTable;
