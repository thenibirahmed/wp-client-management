import React, { useState, useEffect } from "react";

import useHashRouting from "../../../utils/useHashRouting";
import {
  Delete03Icon,
  PencilEdit02Icon,
  Task01Icon,
  ViewIcon,
} from "../../../utils/icons";
import RedCirlcle from "../../helper/RedCirlcle";
import SkyBlueCirle from "../../helper/SkyBlueCirle";
import YellowCirle from "../../helper/YellowCirle";
import Pagination from "../Pagination";
import useCheckedHandler from "../../../utils/useCheckedItem";
import truncateText from "../../../utils/truncateText";

const tableData = [
  {
    id: 1,
    creator: "Easin Ahmed",
    note: "Loram Maintenance of Way, Inc. is a railroad maintenance equipment and services provider. Loram provides track maintenance services to freight, passenger, and transit railroads worldwide, as well as sells and leases equipment which performs these functions. ",
    time: "july 05, 2024",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    creator: "Easin Ahmed",
    note: "Loram Maintenance of Way, Inc. is a railroad maintenance equipment and services provider. Loram provides track maintenance services to freight, passenger, and transit railroads worldwide, as well as sells and leases equipment which performs these functions. ",
    time: "july 05, 2024",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    creator: "Easin Ahmed",
    note: "Loram Maintenance of Way, Inc. is a railroad maintenance equipment and services provider. Loram provides track maintenance services to freight, passenger, and transit railroads worldwide, as well as sells and leases equipment which performs these functions. ",
    time: "july 05, 2024",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 4,
    creator: "Easin Ahmed",
    note: "Loram Maintenance of Way, Inc. is a railroad maintenance equipment and services provider. Loram provides track maintenance services to freight, passenger, and transit railroads worldwide, as well as sells and leases equipment which performs these functions. ",
    time: "july 05, 2024",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const ClientNoteTable = () => {
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
                    className="py-3.5 uppercase   pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    Creator
                  </th>
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    Note
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
                        <div className="flex items-center  gap-3">
                          <img
                            className="h-7 w-7 rounded-full bg-gray-50"
                            src={item.image}
                            alt={item.creator}
                          />
                          <div>
                            <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                              {item.creator}
                            </h3>
                          </div>
                        </div>
                      </td>{" "}
                      <td className="whitespace-nowrap px-3 py-4  text-textColor2 font-metropolis font-normal text-sm">
                        {truncateText(item.note)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor2 font-metropolis font-normal">
                        {item.time}
                      </td>
                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <a
                            href={``}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <ViewIcon
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

export default ClientNoteTable;
