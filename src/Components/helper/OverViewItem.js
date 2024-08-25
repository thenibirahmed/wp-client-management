export const OvierViewItem = ({ title, amount, invoice }) => {
  return (
    <>
      <div className="w-80 space-y-4  text-center sm:text-start  px-5 py-5">
        <h3 className="font-metropolis uppercase text-xs text-textColor2 font-semibold">
          {title}
        </h3>
        <h1 className=" font-semibold font-metropolis text-3xl text-textColor ">
          ${amount}
        </h1>
        <h6 className="font-metropolis  text-sm text-textColor2 font-normal">
          <span>{invoice} </span>
          <span>{invoice > 1 ? "invoices" : "invoice"}</span>
        </h6>
      </div>
    </>
  );
};
