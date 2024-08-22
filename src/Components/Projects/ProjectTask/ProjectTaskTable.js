import React, { useState, useEffect } from "react";

import {
  Delete03Icon,
  PencilEdit02Icon,
  Task01Icon,
} from "../../../utils/icons";
import RedCirlcle from "../../helper/RedCirlcle";
import SkyBlueCirle from "../../helper/SkyBlueCirle";
import YellowCirle from "../../helper/YellowCirle";
import Pagination from "../../Clients/Pagination";
import useCheckedHandler from "../../../utils/useCheckedItem";
import useHashRouting from "../../../utils/useHashRouting";

const tableData = [
  {
    id: 1,
    owner: "Easin Ahmed",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Analysis Request",
    dueDate: "August 2, 2013",
    assigneeTo: "Tanvir",
    status: "To Do",
    priority: "High",
  },
  {
    id: 2,
    owner: "Easin Ahmed",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Analysis Request",
    dueDate: "August 2, 2013",
    assigneeTo: "Tanvir",
    status: "Doing",
    priority: "High",
  },
  {
    id: 3,
    owner: "Easin Ahmed",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Analysis Request",
    dueDate: "August 2, 2013",
    assigneeTo: "Tanvir",
    status: "Done",
    priority: "High",
  },
  {
    id: 4,
    owner: "Easin Ahmed",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Analysis Request",
    dueDate: "August 2, 2013",
    assigneeTo: "Tanvir",
    status: "Done",
    priority: "High",
  },
];

const ProjectTaskTable = () => {
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
                        checkedAllClient(e.target.checked, tableData)
                      }
                      type="checkbox"
                    />
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 uppercase   pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    name
                  </th>
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    owner
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 py-3.5 uppercase text-left text-sm font-semibold text-textColor2"
                  >
                    Due date
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    Assignee to
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
                    itemStatus === "to do"
                      ? "bg-customBg3 text-red2"
                      : itemStatus === "doing"
                      ? "bg-customBg5 text-textColor"
                      : itemStatus === "done"
                      ? "bg-customBg3 text-red2"
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
                        <div className="flex items-center  gap-3">
                          <img
                            className="h-7 w-7 rounded-full bg-gray-50"
                            src={item.image}
                            alt={item.owner}
                          />
                          <div>
                            <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                              {item.owner}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor2 font-metropolis font-medium">
                        ${item.dueDate}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-customRed font-metropolis font-medium">
                        <div className="flex items-center  gap-3">
                          <img
                            className="h-7 w-7 rounded-full bg-gray-50"
                            src={item.image}
                            alt={item.assigneeTo}
                          />
                          <div>
                            <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                              {item.assigneeTo}
                            </h3>
                          </div>
                        </div>
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

export default ProjectTaskTable;
