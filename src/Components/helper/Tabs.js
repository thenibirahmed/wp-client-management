import React, { useEffect } from "react";
import { useStoreContext } from "../../store/ContextApiStore";

const Tab = ({ task = false }) => {
  const { allTabItems, setAllTabItems } = useStoreContext();

  const onTabChangeHandler = (selectedTab) => {
    let updatedTab = {};

    for (let keys in allTabItems) {
      if (keys === selectedTab) {
        updatedTab[keys] = true;
      } else {
        updatedTab[keys] = false;
      }
    }

    setAllTabItems(updatedTab);
  };

  function activeClass(tab) {
    return `${
      allTabItems[tab] ? "text-customBlue border-b-2 border-b-customBlue " : ""
    } `;
  }

  return (
    <div className="flex pt-3 gap-5 md:flex-row  flex-wrap   items-center text-textColor2 font-metropolis text-sm font-semibold border-b   border-b-borderColor">
      {task ? (
        <button
          className={`${activeClass("task")} pb-3 w-[120px]`}
          onClick={() => onTabChangeHandler("task")}
        >
          Task (25)
        </button>
      ) : (
        <button
          className={`${activeClass("project")} pb-3 w-[120px]`}
          onClick={() => onTabChangeHandler("project")}
        >
          Projects (25)
        </button>
      )}
      <button
        className={`${activeClass("invoice")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("invoice")}
      >
        Invoices (10)
      </button>
      <button
        className={`${activeClass("note")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("note")}
      >
        Notes
      </button>
      <button
        className={`${activeClass("file")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("file")}
      >
        Files (25)
      </button>
      <button
        className={`${activeClass("email")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("email")}
      >
        Email
      </button>
      <button
        className={`${activeClass("info")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("info")}
      >
        Additional Info
      </button>
    </div>
  );
};

export default Tab;
