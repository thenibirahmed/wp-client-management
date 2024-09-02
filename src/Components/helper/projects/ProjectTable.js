import React, { useState } from "react";
import {
  Delete03Icon,
  PencilEdit02Icon,
  Task01Icon,
} from "../../../utils/icons";

import useCheckedHandler from "../../../utils/useCheckedItem";
import RedCirlcle from "../../helper/RedCirlcle";
import SkyBlueCirle from "../../helper/SkyBlueCirle";
import YellowCirle from "../../helper/YellowCirle";
import useHashRouting from "../../../utils/useHashRouting";
import Pagination from "../../Clients/Pagination";

let assignee = [
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
const tableData = [
  {
    id: 1,

    projectName: "The",
    clientName: "Easin Ahmed",
    assignee,
    invoice: 2500,
    revenue: 35,
    due: 72,
    status: "Completed",
    priority: "High",
  },
  {
    id: 2,

    projectName: "The sunflower garden",
    clientName: "Easin Ahmed",
    assignee,
    invoice: 2500,
    revenue: 35,
    due: 72,
    status: "On Hold",
    priority: "Low",
  },
  {
    id: 3,

    projectName: "The sunflower garden",
    clientName: "Easin Ahmed",
    assignee,
    invoice: 2500,
    revenue: 35,
    due: 72,
    status: "Cancelled",
    priority: "Medium",
  },
  {
    id: 4,

    projectName: "The sunflower garden",
    clientName: "Easin Ahmed",
    assignee,
    invoice: 2500,
    revenue: 35,
    due: 72,
    status: "In progress",
    priority: "Low",
  },
  {
    id: 5,

    projectName: "The sunflower garden",
    clientName: "Easin Ahmed",
    assignee,
    invoice: 2500,
    revenue: 35,
    due: 72,
    status: "In Review",
    priority: "Low",
  },
];

const ProjectTable = ({ projectData, pagination }) => {
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
          <div className="overflow-hidden shadow ring-1  ring-black ring-opacity-5 sm:rounded-lg">
            <table className="xl:min-w-full min-w-[1000px] divide-y divide-borderColor ">
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
                        checkedAllClient(e.target.checked, projectData)
                      }
                      type="checkbox"
                    />
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 uppercase    pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    Project Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 uppercase    pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    Client Name
                  </th>{" "}
                  <th
                    scope="col"
                    className="py-3.5 uppercase    pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    Assignee
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
                    PRORITY
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
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {projectData.map((item) => {
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
                      : "bg-customBg1 text-green";

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
                          {item.project_name}
                        </h3>
                      </td>{" "}
                      <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6 ">
                        <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                          {item.client_name}
                        </h3>
                      </td>{" "}
                      <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6  ">
                        <div className="flex ">
                          <>
                            {assignee.slice(0, 3).map((img, i) => {
                              return (
                                <img
                                  src={img.src}
                                  alt=""
                                  className={`w-6 h-6 object-cover rounded-full ${
                                    i === 0 ? "ml-0" : "-ml-1"
                                  }`}
                                />
                              );
                            })}
                            <div className="w-6 h-6 flex justify-center items-center bg-customBg2 border border-borderColor text-textColor2 font-metropolis rounded-full text-[8px] font-medium">
                              +{assignee.length}
                            </div>
                          </>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4  text-invoiceColor font-metropolis font-semibold text-sm">
                        ${item.invoice}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-invoiceColor font-metropolis font-semibold">
                        ${item.revenue}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-customRed font-metropolis font-semibold">
                        ${item.due}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor font-metropolis font-medium">
                        <div className="flex items-center gap-2">
                          {itemPriority.toLowerCase() === "high" ? (
                            <RedCirlcle />
                          ) : itemPriority.toLowerCase() === "low" ? (
                            <SkyBlueCirle />
                          ) : itemPriority.toLowerCase() === "medium" ? (
                            <YellowCirle />
                          ) : (
                            <RedCirlcle />
                          )}
                          {item.priority}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm  font-metropolis font-medium">
                        <span
                          className={`${statusClass} py-[2px] px-[10px] font-metropolis font-medium text-xs rounded-[5px]`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <a
                            href={`#/projects/#/${item.id}`}
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

export default ProjectTable;
