import React from "react";
import { Add01Icon } from "../../../../utils/icons";
import Pagination from "../../../Clients/Pagination";

const tableData = [
  {
    id: 1,
    itemDetails: "ABC Website Development",
    quantity: 1,
    rate: 35,
    discount: 72,
    tax: 72,
    total: 450,
  },
  {
    id: 2,
    itemDetails: "ABC Website Development",
    quantity: 4,
    rate: 35,
    discount: 72,
    tax: 15,
    total: 650,
  },
  {
    id: 3,
    itemDetails: "ABC Website Development",
    quantity: 5,
    rate: 35,
    discount: 72,
    tax: 33,
    total: 740,
  },
];

const InvoiceItemTable = () => {
  return (
    <div className="space-y-4">
      <React.Fragment>
        <div className="flex justify-between items-center">
          <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
            Item Table
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
        <div className="flow-root">
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
                        className=" uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                      >
                        Quantity
                      </th>{" "}
                      <th
                        scope="col"
                        className=" uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                      >
                        Rate
                      </th>{" "}
                      <th
                        scope="col"
                        className=" uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                      >
                        Discount
                      </th>
                      <th
                        scope="col"
                        className=" uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                      >
                        Tax
                      </th>
                      <th
                        scope="col"
                        className=" uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {tableData.map((item) => {
                      return (
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6 ">
                            icon
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6 ">
                            <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                              {item.itemDetails}
                            </h3>
                          </td>{" "}
                          <td className="text-sm  text-textColor font-metropolis font-normal leading-[14px]  pl-10">
                            {item.quantity}
                          </td>
                          <td className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                            ${item.rate}
                          </td>
                          <td className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                            ${item.discount}
                          </td>
                          <td className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                            ${item.tax}
                          </td>{" "}
                          <td className="text-sm  text-textColor font-metropolis font-semibold leading-[14px]">
                            ${item.total}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* <Pagination /> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default InvoiceItemTable;
