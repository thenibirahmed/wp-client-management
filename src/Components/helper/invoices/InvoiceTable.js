import React from "react";

import useHashRouting from "../../../utils/useHashRouting";
import Pagination from "../../Clients/Pagination";
import useCheckedHandler from "../../../utils/useCheckedItem";
import { Delete03Icon, PencilEdit02Icon } from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";

const InvoiceTable = ({
  invoiceList,
  projectId,
  pagination,
  selectedInvoices,
  setSelectedInvoices,
  isAllselected,
  setIsAllSelected,
  isClient = false,
  slug,
}) => {
  const { checkedSingleClient, checkedAllClient } = useCheckedHandler(
    selectedInvoices,
    setIsAllSelected,
    setSelectedInvoices
  );
  const { createInvoice, updateInvoice, setUpdateInvoice, setInvoiceId } =
    useStoreContext();
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
                        checkedAllClient(e.target.checked, invoiceList)
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
                    {isClient ? "Project Name" : "client Name"}
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    {" "}
                    {isClient ? "amount" : "total"}
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
                {invoiceList?.map((item) => {
                  let itemStatus = item.status;

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
                      : "bg-customBg4 text-purple";

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
                          {item.code}
                        </h3>
                      </td>{" "}
                      <td className="whitespace-nowrap px-3 py-4  text-textColor font-metropolis font-normal text-sm">
                        {isClient ? item.project : item.client_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4  text-textColor font-metropolis font-semibold text-sm">
                        $ {isClient ? item.amount : item.total}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm  font-metropolis font-medium">
                        <span
                          className={`${statusClass} py-[2px] px-[10px] font-metropolis font-medium text-xs rounded-[5px]`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4  text-textColor font-metropolis font-normal text-sm">
                        {item.payment_method}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4  text-textColor font-metropolis font-normal text-sm">
                        {item.due_date}
                      </td>
                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setUpdateInvoice(true);
                              setInvoiceId(item?.id);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <PencilEdit02Icon
                              className="text-textColor2"
                              width="20px"
                              height="20px"
                            />
                          </button>
                          <button className="text-indigo-600 hover:text-indigo-900">
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
            <Pagination
              pagination={pagination}
              slug={slug}
              query="/?invoice"
              projectId={projectId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
