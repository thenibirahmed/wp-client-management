import React, { useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useFetchPriorities, useFetchStatus } from "../../hooks/useQuery";
import Skeleton from "../Skeleton";
import Errors from "../Errors";
import { useStoreContext } from "../../store/ContextApiStore";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Filter = ({ noPriority }) => {
  const {
    selectStatus,
    setSelectStatus,
    selectPriority,
    setSelectPriority,
    selectedFilter,
    setSelectedFilter,
  } = useStoreContext();
  console.log();

  // State for the selected filter

  const {
    isLoading: isLoadingPriorities,
    data: priorities,
    error: pPrioritiesErr,
  } = useFetchPriorities("project", onError);

  const {
    isLoading: isLoadingStatus,
    data: statuses,
    error: pStatusErr,
  } = useFetchStatus("project", onError);

  function onError(err) {
    toast.error(err?.response?.data?.message?.errors || "Something went wrong");
    console.log(err);
  }

  const isLoading = isLoadingStatus || isLoadingPriorities;

  if (pPrioritiesErr || pStatusErr)
    return <Errors message="Internal Server Error" />;

  return (
    <Menu as="div" className="relative inline-block text-left ml-4">
      <div>
        <Menu.Button className="flex w-32 justify-between gap-x-1.5 rounded-md p-[10px] bg-white text-textColor2 border border-borderColor text-sm font-semibold shadow-sm ring-1 ring-inset ring-textColor2 hover:bg-gray-50">
          <div className="flex-1 flex items-center gap-1">
            <ChevronDownIcon
              aria-hidden="true"
              className="h-5 text-textColor2"
            />
            <span>{selectedFilter}</span> {/* Show selected item name here */}
          </div>
          <ChevronDownIcon
            aria-hidden="true"
            className="h-5 w-5 text-textColor2"
          />
        </Menu.Button>
      </div>

      <Menu.Items
        transition
        className="absolute py-2 px-2 left-0 lg:right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
      >
        <div className="space-y-1">
          {/* Status Disclosure */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classNames(
                    "group flex items-center justify-between gap-x-3 w-full p-2 rounded-md bg-white text-sm font-[500] font-metropolis text-textColor2 hover:bg-gray-100",
                    open ? "bg-gray-100" : ""
                  )}
                >
                  <span>Status</span>
                  <ChevronRightIcon
                    className={classNames(
                      "h-5 w-5 shrink-0 text-textColor2",
                      open ? "rotate-90 transform" : ""
                    )}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="mt-2 space-y-1">
                  {statuses?.statuses?.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => {
                        setSelectStatus(status.id);
                      }}
                      className={`block ${
                        selectStatus == status.id
                          ? "bg-indigo-600 text-white"
                          : ""
                      } w-full text-left px-4 py-2 text-sm text-textColor2 `}
                    >
                      {status.name}
                    </button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Priorities Disclosure */}
          {!noPriority && (
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classNames(
                      "group flex items-center justify-between gap-x-3 w-full p-2 rounded-md bg-white text-sm font-[500] font-metropolis text-textColor2 hover:bg-gray-100",
                      open ? "bg-gray-100" : ""
                    )}
                  >
                    <span>Priorities</span>
                    <ChevronRightIcon
                      className={classNames(
                        "h-5 w-5 shrink-0 text-textColor2",
                        open ? "rotate-90 transform" : ""
                      )}
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="mt-2 space-y-1">
                    {priorities?.priorities?.map((priority) => (
                      <button
                        key={priority.id}
                        onClick={() => {
                          setSelectPriority(priority.id);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm text-textColor2 ${
                          selectPriority == priority.id
                            ? "bg-indigo-600 text-white"
                            : ""
                        }`}
                      >
                        {priority.name}
                      </button>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          )}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default Filter;
