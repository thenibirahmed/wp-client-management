"use client";

import { useEffect, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const SelectTextField = ({
  label,
  select,
  setSelect,
  lists,
  isSubmitting,
  currency = false,
}) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (!select?.id && isSubmitting) {
      setError("This field is required*");
    }

    if (select?.id && !isSubmitting) {
      setError("");
    }
  }, [select, isSubmitting]);

  return (
    <Listbox value={select} onChange={setSelect}>
      <div className={`flex flex-col gap-2 ${currency ? "w-fit" : " w-full"} `}>
        {label && (
          <label className="font-medium text-sm  font-metropolis text-textColor">
            {label}
          </label>
        )}
        <div className="relative">
          <ListboxButton
            className={`relative text-sm font-metropolis border ${
              currency
                ? "rounded-[5px] border-[1px]  px-4 py-[8px]"
                : "rounded-md py-1.5 pl-3 pr-10 "
            } w-full cursor-default  bg-white  text-left text-textColor2   sm:text-sm sm:leading-6 ${
              error ? "border-customRed" : "border-borderColor"
            }`}
          >
            <span className="block truncate">{select?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {lists?.map((person) => (
              <ListboxOption
                key={person.id}
                value={person}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {person.name}
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
        {error && (
          <p className="text-xs font-semibold text-customRed -mt-1">{error}</p>
        )}
      </div>
    </Listbox>
  );
};
