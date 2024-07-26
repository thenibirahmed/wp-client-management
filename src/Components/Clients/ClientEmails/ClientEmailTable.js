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
import { useStoreContext } from "../../../store/ContextApiStore";
import { ClientEmailModal } from "./ClientEmailModal";

const tableData = [
  {
    id: 1,
    from: "Easin Ahmed",
    email: {
      title: "How a visual artist redefines success in graphic design",
      content:
        "Loram Maintenance of Way, Inc. is a railroad maintenance equipment and services provider. Loram provides track maintenance services to freight, passenger, and transit railroads worldwide, as well as sells and leases equipment which performs these functions. ",
    },
    time: "july 05, 2024",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    from: "Easin Ahmed",
    email: {
      title: "How a visual artist redefines success in graphic design",
      content:
        "Loram Maintenance of Way, Inc. is a railroad maintenance equipment and services provider. Loram provides track maintenance services to freight, passenger, and transit railroads worldwide, as well as sells and leases equipment which performs these functions. ",
    },
    time: "july 05, 2024",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    from: "Easin Ahmed",
    email: {
      title: "How a visual artist redefines success in graphic design",
      content:
        "Loram Maintenance of Way, Inc. is a railroad maintenance equipment and services provider. Loram provides track maintenance services to freight, passenger, and transit railroads worldwide, as well as sells and leases equipment which performs these functions. ",
    },
    time: "july 05, 2024",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const ClientEmailTable = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");

  const {
    openEmailModal,
    setOpenEmailModal,

    setSelectedViewEmail,
  } = useStoreContext();

  const [selectedEmail, setSelectedEmail] = useState([]);
  const [isAllselected, setIsAllSelected] = useState(false);

  const { checkedSingleClient, checkedAllClient } = useCheckedHandler(
    selectedEmail,
    setIsAllSelected,
    setSelectedEmail
  );

  const viewEmailHandler = (emailId) => {
    setOpenEmailModal(true);

    const findEmail = tableData.find((email) => email.id === emailId);

    setSelectedViewEmail(findEmail);
  };

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
                        selectedEmail.length > 0 && isAllselected ? true : false
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
                    From
                  </th>
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    Email
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
                  const isChecked = selectedEmail.some(
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
                            alt={item.from}
                          />
                          <div>
                            <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                              {item.from}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 space-y-1  text-textColor2 font-metropolis font-normal text-sm">
                        <h3 className="text-sm   text-textColor font-metropolis font-normal ">
                          {item.email.title}
                        </h3>{" "}
                        <h6 className="text-xs  text-textColor2 font-metropolis font-normal ">
                          {truncateText(item.email.content)}
                        </h6>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor2 font-metropolis font-normal">
                        {item.time}
                      </td>
                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <button
                            onClick={() => viewEmailHandler(item.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <ViewIcon
                              className="text-textColor2"
                              width="20px"
                              height="20px"
                            />
                          </button>
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
      <ClientEmailModal
        openEmailModal={openEmailModal}
        setOpenEmailModal={setOpenEmailModal}
      />
    </div>
  );
};

export default ClientEmailTable;
