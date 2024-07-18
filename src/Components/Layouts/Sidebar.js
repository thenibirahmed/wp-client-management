import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

import useHashRouting from "../../utils/useHashRouting";
import { navigationItems } from "../../utils/navigationItem";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const [navigation, setNavigation] = useState(navigationItems);
  const currentPath = useHashRouting("");

  const onNavigationItemHandler = (currentItem) => {
    setNavigation(
      navigation.map((item) => ({
        ...item,
        current: item.name === currentItem.name,
      }))
    );
  };

  useEffect(() => {
    if (currentPath) {
      setNavigation(
        navigation?.map((item) => ({
          ...item,
          current: item.href === `#/${currentPath}`,
        }))
      );
    }
  }, [currentPath]);

  return (
    <React.Fragment>
      <div className="flex grow flex-col gap-y-16 overflow-y-auto bg-siderbarBG px-6 pb-4">
        <div className="flex h-16  shrink-0 items-center">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-customBlue flex justify-center items-center text-white font-metropolis text-xl font-[700]">
              <span>E</span>
            </div>

            <h3 className="text-white font-metropolis text-xl font-[700]">
              EIC CRM
            </h3>
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-2">
                {navigation.map((item) => (
                  <li
                    onClick={() => onNavigationItemHandler(item)}
                    key={item.name}
                  >
                    {!item.children ? (
                      <a
                        href={item.href}
                        className={classNames(
                          item.current ? "bg-customBlue" : "",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-[500] font-metropolis text-white"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-white"
                        />
                        <span className="mt-1"> {item.name}</span>
                      </a>
                    ) : (
                      <Disclosure as="a">
                        <DisclosureButton
                          className={classNames(
                            item.current ? "bg-customBlue" : "",
                            "group flex gap-x-3  rounded-md w-full p-2 text-sm font-[500] font-metropolis text-white"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0 text-white"
                          />
                          {item.name}
                          <ChevronRightIcon
                            aria-hidden="true"
                            className="ml-auto h-5 w-5 shrink-0 text-white group-data-[open]:rotate-90 group-data-[open]:text-white"
                          />
                        </DisclosureButton>
                        <DisclosurePanel as="ul" className="mt-1 px-2">
                          {item.children.map((subItem) => (
                            <li key={subItem.name}>
                              {/* 44px */}
                              <DisclosureButton
                                as="a"
                                href={subItem.href}
                                className={classNames(
                                  subItem.current ? "bg-customBlue" : "",
                                  "block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-white"
                                )}
                              >
                                {subItem.name}
                              </DisclosureButton>
                            </li>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    )}
                  </li>
                ))}
              </ul>
            </li>

            <li className="mt-auto">
              <a
                href="#/setting"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Cog6ToothIcon
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0"
                />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
