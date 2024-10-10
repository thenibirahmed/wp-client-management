import React, { useEffect } from "react";
import { useStoreContext } from "../../../../store/ContextApiStore";

const ContactTeamDetailsTabs = ({ bottomTab }) => {
  const {
    contactTabs,
    setContactTabs,
    contactTeamDetailsTabs,
    setContactTeamDetailsTabs,
  } = useStoreContext();

  const onTabChangeHandler = (selectedTab) => {
    let updatedTab = {};

    for (let keys in contactTeamDetailsTabs) {
      if (keys === selectedTab) {
        updatedTab[keys] = true;
      } else {
        updatedTab[keys] = false;
      }
    }

    setContactTeamDetailsTabs(updatedTab);
  };

  function activeClass(tab) {
    return `${
      contactTeamDetailsTabs[tab]
        ? "text-customBlue border-b-2 border-b-customBlue "
        : ""
    } `;
  }

  return (
    <div className="flex pt-3 gap-5 md:flex-row  flex-wrap   items-center text-textColor2 font-metropolis text-sm font-semibold border-b   border-b-borderColor">
      <button
        className={`${activeClass("project")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("project")}
      >
        Project{" "}
        <span className="text-textColor2">({bottomTab?.projectsCount})</span>
      </button>
      <button
        className={`${activeClass("task")} pb-3 w-[120px]`}
        onClick={() => onTabChangeHandler("task")}
      >
        Task <span className="text-textColor2">({bottomTab?.tasksCount})</span>
      </button>
    </div>
  );
};

export default ContactTeamDetailsTabs;
