export const OvierViewItem = ({
  title,
  amount,
  invoice,
  isProject = false,
}) => {
  const convertedAmount = Number(amount).toFixed(2);
  return (
    <>
      <div className="w-80 space-y-4  text-center md:text-start  px-5 py-5">
        <h3 className="font-metropolis uppercase text-xs text-textColor2 font-semibold">
          {title}
        </h3>
        <h1 className=" font-semibold font-metropolis text-3xl text-textColor ">
          {!isProject ? "$" : ""}
          {isProject ? amount : convertedAmount}
        </h1>
        <h6 className="font-metropolis  text-sm text-textColor2 font-normal">
          <span>{invoice} </span>
        </h6>
      </div>
    </>
  );
};
