import React, { useState, useRef } from "react";
import { Add01Icon, Delete03Icon } from "../../../../utils/icons";
import Pagination from "../../../Clients/Pagination";
import useSubtotal from "../../../../hooks/useSubtotal";
import { useStoreContext } from "../../../../store/ContextApiStore";

const InvoiceItemTable = ({ invoiceItem, setInvoiceItems }) => {
  const itemDetailsRef = useRef(null);

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...invoiceItem];
    if (field === "discountType" || field === "taxType") {
      updatedItems[index][field] = value;
    } else {
      updatedItems[index][field] =
        field === "itemDetails" ? value : Number(value);
    }

    // Calculate total
    const { quantity, rate, discount, discountType, tax, taxType } =
      updatedItems[index];
    let total = quantity * rate;

    // Apply discount
    if (discountType === "percent") {
      total -= (total * discount) / 100;
    } else {
      total -= discount;
    }

    // Apply tax
    if (taxType === "percent") {
      total += (total * tax) / 100;
    } else {
      total += tax;
    }

    updatedItems[index].total = total;
    setInvoiceItems(updatedItems);
  };

  const handleAddRow = () => {
    setInvoiceItems([
      ...invoiceItem,
      {
        id: invoiceItem.length + 1,
        itemDetails: "",
        quantity: 0,
        rate: 0,
        discount: 0,
        discountType: "percent",
        tax: 0,
        taxType: "percent",
        total: 0,
      },
    ]);

    setTimeout(() => {
      itemDetailsRef.current?.focus();
    }, 0);
  };

  const handleDeleteRow = (index) => {
    const updatedItems = invoiceItem.filter((_, i) => i !== index);
    setInvoiceItems(updatedItems);
  };

  // const { subtotal, totalDiscount, totalTax, finalAmount } =
  //   useSubtotal(invoiceItem);

  return (
    <div className="space-y-6">
      <React.Fragment>
        <div className="flex justify-between items-center">
          <h1 className="font-metropolis font-semibold text-textColor text-2xl">
            {invoiceItem.length > 0 && "  Item Table"}
          </h1>
          <div className="space-x-3">
            <button
              type="button"
              className="py-[10px] px-4  border border-customBlue text-customBlue flex justify-center items-center gap-2  rounded-[5px]"
              onClick={handleAddRow}
            >
              <Add01Icon className="text-customBlue w-5 h-5" />
              <span className="font-metropolis text-sm font-medium ">
                Add Item
              </span>
            </button>
          </div>
        </div>
      </React.Fragment>

      {invoiceItem.length > 0 && (
        <React.Fragment>
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="xl:min-w-full min-w-[900px] divide-y divide-borderColor ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 w-10 pl-4 pr-0 text-left text-sm font-semibold text-textColor2 sm:pl-6"
                        >
                          <span></span>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 uppercase pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6"
                        >
                          Item Details
                        </th>
                        <th
                          scope="col"
                          className="uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                        >
                          Rate
                        </th>
                        <th
                          scope="col"
                          className="uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                        >
                          Discount
                        </th>
                        <th
                          scope="col"
                          className="uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                        >
                          Tax
                        </th>
                        <th
                          scope="col"
                          className="uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {invoiceItem?.map((item, index) => (
                        <tr key={item.id}>
                          <td className="whitespace-nowrap  pl-4 pr-3 sm:pl-6">
                            <button onClick={() => handleDeleteRow(index)}>
                              <Delete03Icon className="text-red-500 w-5 h-5" />
                            </button>
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                            <input
                              ref={itemDetailsRef}
                              placeholder="Type new item"
                              value={item.itemDetails}
                              name="itemDetails"
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "itemDetails",
                                  e.target.value
                                )
                              }
                              type="text"
                              className="text-sm text-textColor font-metropolis font-normal leading-[14px] outline-none border-none"
                            />
                          </td>
                          <td className="text-sm text-textColor font-metropolis font-normal leading-[14px] pl-10">
                            <input
                              value={item.quantity}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              type="number"
                              className="w-full text-sm text-textColor font-metropolis font-normal leading-[14px] outline-none border-none"
                            />
                          </td>
                          <td className="text-sm text-textColor font-metropolis font-normal leading-[14px]">
                            <input
                              value={item.rate}
                              onChange={(e) =>
                                handleInputChange(index, "rate", e.target.value)
                              }
                              type="number"
                              className="w-full text-sm text-textColor font-metropolis font-normal leading-[14px] outline-none border-none"
                            />
                          </td>
                          <td className="text-sm text-textColor font-metropolis font-normal leading-[14px]">
                            <input
                              value={item.discount}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "discount",
                                  e.target.value
                                )
                              }
                              type="number"
                              className="w-12 text-sm text-textColor font-metropolis font-normal leading-[14px] outline-none border-none"
                            />
                            <select
                              value={item.discountType}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "discountType",
                                  e.target.value
                                )
                              }
                              className="ml-2"
                            >
                              <option value="percent">%</option>
                              <option value="flat">Flat</option>
                            </select>
                          </td>
                          <td className="text-sm text-textColor font-metropolis font-normal leading-[14px]">
                            <input
                              value={item.tax}
                              onChange={(e) =>
                                handleInputChange(index, "tax", e.target.value)
                              }
                              type="number"
                              className="w-12 text-sm text-textColor font-metropolis font-normal leading-[14px] outline-none border-none"
                            />
                            <select
                              value={item.taxType}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "taxType",
                                  e.target.value
                                )
                              }
                              className="ml-2"
                            >
                              <option value="percent">%</option>
                              <option value="flat">Flat</option>
                            </select>
                          </td>
                          <td className="text-sm text-textColor font-metropolis font-semibold leading-[14px]">
                            ${item?.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default InvoiceItemTable;
