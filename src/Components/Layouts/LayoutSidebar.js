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
import Separator from "./Separator";
import {
  ContactBookIcon,
  CustomerService01Icon,
  EarthIcon,
  GlobalIcon,
  GoogleDocIcon,
  Settings02Icon,
  SlidersVerticalIcon,
} from "../../utils/icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const [navigation, setNavigation] = useState(navigationItems);
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");

  const onNavigationItemHandler = (currentItem) => {
    setNavigation(
      navigation.map((item) => {
        if (item.children) {
          const isCurrent = item.name === currentItem.name;
          const childrenUpdated = item.children.map((child) => ({
            ...child,
            current: child.name === currentItem.name,
          }));

          return {
            ...item,
            current: isCurrent,
            children: childrenUpdated,
          };
        }

        return {
          ...item,
          current: item.name === currentItem.name,
        };
      })
    );
  };

  useEffect(() => {
    setNavigation(
      navigation.map((item) => {
        if (item.children) {
          const isChildCurrent = item.children.some(
            (child) => child.href === `#/${currentPath}`
          );
          const childrenUpdated = item.children.map((child) => ({
            ...child,
            current: child.href === `#/${currentPath}`,
          }));

          return {
            ...item,
            current: item.href === `#/${currentPath}` || isChildCurrent,
            children: childrenUpdated,
          };
        }

        if (item.link === "dashboard" && pathArray[0] === "") {
          return {
            ...item,
            current: true,
          };
        }

        return {
          ...item,
          current: pathArray.includes(item.link),
        };
      })
    );

    if (pathArray[0] === "") {
      navigation[0].current = true;
    }
  }, [currentPath]);

  return (
    <React.Fragment>
      <div className="flex grow flex-col gap-y-16 overflow-y-auto bg-siderbarBG px-6 pb-4 ">
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
          <ul role="list" className="flex flex-1 flex-col gap-y-4">
            <ul role="list" className="-mx-2 space-y-3 pb-4">
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
                        "group flex gap-x-3 rounded-md px-2 py-[6px] text-sm font-[500] font-metropolis text-white"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={`h-6 w-6 shrink-0 ${
                          item.current ? "text-white" : "text-iconColor2"
                        } `}
                      />
                      <span className="mt-1"> {item.name}</span>
                    </a>
                  ) : (
                    <Disclosure href={item.href} as="a">
                      <DisclosureButton
                        className={classNames(
                          item.current ? "bg-customBlue" : "",
                          "group flex gap-x-3  rounded-md w-full p-2 text-sm font-[500] font-metropolis text-white"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={`h-6 w-6 shrink-0 ${
                            item.current ? "text-white" : "text-iconColor2"
                          } `}
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
                            <a
                              href={subItem.href}
                              className={classNames(
                                subItem.current ? "bg-customBlue" : "",
                                "block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-white"
                              )}
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>

            <Separator className="" />
            <li className="mt-3">
              <a
                href="#/docs"
                className={classNames(
                  currentPath === "docs" ? "bg-customBlue" : "",
                  "group flex gap-x-3 rounded-md px-2 py-[6px] text-sm font-[500] font-metropolis text-white"
                )}
              >
                <GoogleDocIcon
                  aria-hidden="true"
                  className={`h-6 w-6 shrink-0 ${
                    currentPath === "docs" ? "text-white" : "text-iconColor2"
                  } `}
                />
                <span className="mt-1">Docs</span>
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#/support"
                className={classNames(
                  currentPath === "support" ? "bg-customBlue" : "",
                  "group flex gap-x-3 rounded-md px-2 py-[6px] text-sm font-[500] font-metropolis text-white"
                )}
              >
                <CustomerService01Icon
                  aria-hidden="true"
                  className={`h-6 w-6 shrink-0 ${
                    currentPath === "support" ? "text-white" : "text-iconColor2"
                  } `}
                />
                <span className="mt-1"> Support</span>
              </a>
            </li>
            <Separator className="  " />

            <li className="mt-auto  flex items-center gap-4 ">
              <a
                href="#/setting"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold   "
              >
                <SlidersVerticalIcon
                  aria-hidden="true"
                  className=" text-iconColor  hover:text-white   "
                />
              </a>
              <a href="#/setting" className="">
                <Settings02Icon
                  aria-hidden="true"
                  className=" text-iconColor  hover:text-white   "
                />
              </a>{" "}
              <a
                href="#/setting"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold   "
              >
                <GlobalIcon
                  aria-hidden="true"
                  className=" text-iconColor  hover:text-white   "
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
