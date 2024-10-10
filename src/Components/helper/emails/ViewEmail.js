import React from "react";
import { useStoreContext } from "../../../store/ContextApiStore";
import { useFetchSingleEmailView } from "../../../hooks/useQuery";
import Skeleton from "../../Skeleton";
import toast from "react-hot-toast";
let image =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const ViewEmail = () => {
  const { selectedViewEmail } = useStoreContext();

  const {
    isLoading,
    data: emailData,
    error,
  } = useFetchSingleEmailView(selectedViewEmail, onError);

  console.log("emailData", emailData);

  function onError(err) {
    console.log(err);
    toast.error("Failed to fetch email details");
  }
  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="py-6 space-y-6">
      <div className="flex gap-[12px] items-end ">
        <img
          className="w-[48px] h-[48px] rounded-full"
          src={image}
          alt="great"
        />
        <div>
          <h3 className="font-metropolis font-semibold text-[16px] leading-[16px] text-textColor">
            {emailData?.from}
          </h3>
          <span className="font-metropolis text-xs font-normal leading-none">
            {emailData?.date}
          </span>
        </div>
      </div>

      <div
        className="font-metropolis text-xs font-normal leading-[21px] pl-[60px] text-textColor2"
        dangerouslySetInnerHTML={{
          __html: emailData?.body,
        }}
      ></div>
    </div>
  );
};

export default ViewEmail;
