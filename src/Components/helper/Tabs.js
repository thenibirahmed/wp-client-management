import React, { useEffect } from "react";
import { useStoreContext } from "../../store/ContextApiStore";
import dayjs from "dayjs";

const defaultValue = {
  projects: 0,
  invoice: 0,
  notes: 0,
  files: 0,
  emails: 0,
  tasks: 0,
};

const Tab = ({ task = false, tabCount = defaultValue }) => {
  const {
    allTabItems,
    setAllTabItems,
    setSearchText,
    setSelectStatus,
    setSelectPriority,
  } = useStoreContext();

  const onTabChangeHandler = (selectedTab) => {
    setSearchText("");
    setSelectStatus("");
    setSelectPriority("");

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
    <div className="flex pt-3 gap-5 md:flex-row  flex-wrap   items-center sm:justify-start justify-center text-textColor2 font-metropolis text-sm font-semibold border-b   border-b-borderColor">
      {task ? (
        <button
          className={`${activeClass("task")} pb-3 w-[120px]`}
          onClick={() => onTabChangeHandler("task")}
        >
          Task ({tabCount?.tasks})
        </button>
      ) : (
        <button
          className={`${activeClass("project")} pb-3 w-[120px]`}
          onClick={() => onTabChangeHandler("project")}
        >
          Projects ({tabCount?.projects})
        </button>
      )}
      <button
        className={`${activeClass("invoice")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("invoice")}
      >
        Invoices ({tabCount?.invoice})
      </button>
      <button
        className={`${activeClass("note")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("note")}
      >
        Notes ({tabCount?.notes})
      </button>
      <button
        className={`${activeClass("file")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("file")}
      >
        Files ({tabCount?.files})
      </button>
      <button
        className={`${activeClass("email")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("email")}
      >
        Email ({tabCount?.emails})
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
