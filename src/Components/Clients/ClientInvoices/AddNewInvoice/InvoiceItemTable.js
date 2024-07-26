import React from "react";
import { Add01Icon } from "../../../../utils/icons";

const tableData = [
  {
    id: 1,
    itemDetails: "ABC Website Development",
    quantity: 2500,
    rate: 35,
    discount: 72,
    tax: "Completed",
    total: "High",
  },
  {
    id: 2,
    itemDetails: "ABC Website Development",
    quantity: 2500,
    rate: 35,
    discount: 72,
    tax: "Completed",
    total: "High",
  },
  {
    id: 3,
    itemDetails: "ABC Website Development",
    quantity: 2500,
    rate: 35,
    discount: 72,
    tax: "Completed",
    total: "High",
  },
];

const InvoiceItemTable = () => {
  return (
    <div className="space-y-2">
      <React.Fragment>
        <div className="flex justify-between items-center">
          <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
            Invoices
          </h1>
          <div className="space-x-3">
            <button
              type="button"
              className="py-[10px] px-4 fitems-center border border-customBlue text-customBlue flex justify-center items-center gap-2  rounded-[5px]"
            >
              <Add01Icon className="text-customBlue w-5 h-5" />
              <span className="font-metropolis text-sm font-medium ">
                Add Item
              </span>
            </button>
          </div>
        </div>
      </React.Fragment>
      <React.Fragment>
        {/* <div className="mt-0 flow-root">
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
                        <span></span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 uppercase   pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                      >
                        Item Details
                      </th>
                      <th
                        scope="col"
                        className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                      >
                        Quantity
                      </th>{" "}
                      <th
                        scope="col"
                        className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                      >
                        Rate
                      </th>{" "}
                      <th
                        scope="col"
                        className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                      >
                        Discount
                      </th>
                      <th
                        scope="col"
                        className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                      >
                        Tax
                      </th>
                      <th
                        scope="col"
                        className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {tableData.map((item) => {
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
        </div> */}
      </React.Fragment>
    </div>
  );
};

export default InvoiceItemTable;
