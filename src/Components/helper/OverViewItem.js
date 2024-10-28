import { formatRevenue } from "../../utils/formatter";

export const OvierViewItem = ({
  title,
  amount,
  invoice,
  isProject = false,
  icons = false,
  expense = false,
  clients = false,
  Icon,
  dashboard = false,
  symbol,
}) => {
  const convertedAmount = amount;
  return (
    <>
      <div
        className={`xl:w-80 w-full space-y-4  text-center xl:text-start  px-5 py-5 ${
          expense ? "bg-customBlue" : ""
        }`}
      >
        {icons ? (
          <div className="flex items-center xl:justify-between justify-center">
            <h3
              className={`font-metropolis uppercase text-xs  font-semibold ${
                expense ? "text-white" : "text-textColor2"
              }`}
            >
              {title}
            </h3>
            {icons && Icon && (
              <Icon
                className={` ${expense ? "text-white" : "text-customBlue"}`}
              />
            )}
          </div>
        ) : (
          <h3
            className={`font-metropolis uppercase text-xs ${
              expense ? "text-white" : "text-textColor2"
            } font-semibold`}
          >
            {title}
          </h3>
        )}
        <h1
          className={` font-semibold font-metropolis text-3xl ${
            dashboard ? "pt-3" : ""
          }  ${expense ? "text-white" : "text-textColor"}`}
        >
          {!isProject ? symbol : ""}
          {dashboard && !isProject && "$"}
          {isProject ? amount : convertedAmount}
        </h1>
        {!expense && !clients && (
          <h6
            className={`font-metropolis  text-sm ${
              expense ? "text-white" : "text-textColor2"
            } font-normal`}
          >
            <span>{invoice} </span>
          </h6>
        )}
        {expense && (
          <div className="flex items-center xl:justify-start justify-center  gap-[10px]">
            <span className="bg-white p-[4px] rounded-[5px] font-metropolis text-sm font-semibold text-invoiceColor">
              +6%
            </span>
            <span className="text-sm font-normal text-white font-metropolis">
              from last 3 months
            </span>
          </div>
        )}{" "}
        {clients && (
          <div className="flex items-center xl:justify-start  justify-center  gap-[5px]">
            <span className="bg-customBg3 p-[4px] rounded-[5px] font-metropolis text-sm font-semibold text-red">
              -12%
            </span>
            <span className="text-sm font-normal text-textColor2 font-metropolis">
              from last 3 months
            </span>
          </div>
        )}
      </div>
    </>
  );
};
