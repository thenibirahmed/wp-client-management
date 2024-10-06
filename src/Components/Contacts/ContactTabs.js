import React, { useEffect } from "react";
import { useStoreContext } from "../../store/ContextApiStore";

const ContactTabs = () => {
  const { contactTabs, setContactTabs } = useStoreContext();

  const onTabChangeHandler = (selectedTab) => {
    let updatedTab = {};

    for (let keys in contactTabs) {
      if (keys === selectedTab) {
        updatedTab[keys] = true;
      } else {
        updatedTab[keys] = false;
      }
    }

    setContactTabs(updatedTab);
  };

  function activeClass(tab) {
    return `${
      contactTabs[tab] ? "text-customBlue border-b-2 border-b-customBlue " : ""
    } `;
  }

  return (
    <div className="flex pt-3 gap-5 md:flex-row  flex-wrap   items-center text-textColor2 font-metropolis text-sm font-semibold border-b   border-b-borderColor">
      <button
        className={`${activeClass("team")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("team")}
      >
        Team <span className="text-textColor2"></span>
      </button>
      <button
        className={`${activeClass("client")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("client")}
      >
        Clients <span className="text-textColor2"></span>
      </button>
    </div>
  );
};

export default ContactTabs;
