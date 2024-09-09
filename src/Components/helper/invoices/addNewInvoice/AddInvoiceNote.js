import React from "react";
import { useStoreContext } from "../../../../store/ContextApiStore";
import useSubtotal from "../../../../hooks/useSubtotal";

const AddInvoiceNote = ({ invoiceItem, setNoteText }) => {
  const { setCreateInvoice } = useStoreContext();

  const { subtotal, totalDiscount, totalTax, finalAmount } =
    useSubtotal(invoiceItem);

  return (
    <div className="flex  md:flex-row flex-col gap-3">
      <div className="flex-1  md:pt-[17px]">
        <h1 className="font-metropolis font-semibold leading-7  text-textColor text-[16px]">
          Note
        </h1>
        <textarea
          onChange={(e) => setNoteText(e.target.value)}
          className="w-full mt-1 border border-borderColor outline-none px-5 py-4 rounded-[8px]"
          rows={5}
        />
      </div>
      <div className="w-[350px] border border-borderColor  rounded-[8px] ">
        <div className="flex justify-between items-center px-4 py-[16px] border ">
          <h1 className="font-metropolis font-normal text-textColor">
            Subtotal
          </h1>
          <h1 className="font-metropolis font-normal text-textColor">
            $ {subtotal}
          </h1>
        </div>
        <div className="flex justify-between items-center px-4 py-[16px] border">
          <h1 className="font-metropolis font-normal text-textColor">
            Discount
          </h1>
          <h1 className="font-metropolis font-normal text-textColor">
            $ {totalDiscount}
          </h1>
        </div>{" "}
        <div className="flex justify-between items-center px-4 py-[16px] border">
          <h1 className="font-metropolis font-normal text-textColor">Tax</h1>
          <h1 className="font-metropolis font-normal text-textColor">
            $ {totalTax}
          </h1>
        </div>{" "}
        <div className="flex justify-between items-center px-4 py-[16px] border">
          <h1 className="font-metropolis font-semibold text-textColor">
            Total
          </h1>
          <h1 className="font-metropolis font-normal text-textColor">
            $ {finalAmount}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AddInvoiceNote;
