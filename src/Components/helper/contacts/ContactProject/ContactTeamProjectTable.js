import React, { useState } from "react";
import {
  Delete03Icon,
  PencilEdit02Icon,
  Task01Icon,
} from "../../../../utils/icons";

import useCheckedHandler from "../../../../utils/useCheckedItem";
import RedCirlcle from "../../../helper/RedCirlcle";
import SkyBlueCirle from "../../../helper/SkyBlueCirle";
import YellowCirle from "../../../helper/YellowCirle";
import useHashRouting from "../../../../utils/useHashRouting";
import Pagination from "../../../Clients/Pagination";

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
const ContactTeamProjectTable = ({
  teamLists,
  pagination,
  selectedClient,
  setSelectedClient,
  isAllselected,
  setIsAllSelected,
}) => {
  const { checkedAllClient, checkedSingleClient } = useCheckedHandler(
    selectedClient,
    setIsAllSelected,
    setSelectedClient
  );

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
                        checkedAllClient(e.target.checked, teamLists)
                      }
                      type="checkbox"
                    />
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 uppercase    pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    Project Name
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
                    PRORITY
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {teamLists?.map((item, i) => {
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
                    <tr key={i}>
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
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6  ">
                        <div className=" text-textColor2 font-metropolis pl-4">
                          {/* <>
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
                              +{item.assignee}
                            </div>
                          </> */}
                          {item.assignee}
                        </div>
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm  font-metropolis font-medium">
                        <span
                          className={`${statusClass} py-[2px] px-[10px] font-metropolis font-medium text-xs rounded-[5px]`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              pagination={pagination}
              slug="projects"
              query="/?page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTeamProjectTable;
