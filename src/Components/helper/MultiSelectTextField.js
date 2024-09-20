import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const MultiSelectTextField = ({
  label,
  select,
  setSelect,
  lists,
  isSubmitting,
  project = false,
  allIds,
  update = false,
}) => {
  const handleSelect = (person) => {
    const isIncluded = select?.some((item) => item.id === person.id);
    if (isIncluded) {
      setSelect(select?.filter((p) => p.id !== person.id));
    } else {
      setSelect([...select, person]);
    }
  };

  return (
    <Listbox value={select} multiple>
      <div className="flex flex-col gap-2 w-full">
        <label className="font-medium text-sm font-metropolis text-textColor">
          {label}
        </label>
        <div className="relative ">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <span className="block truncate">
              {select?.length > 0
                ? select?.map((p) => p.name).join(", ")
                : project
                ? "Select Projects"
                : "Select Peoples"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {lists?.map((person) => (
              <ListboxOption
                key={person.id}
                value={person}
                className={`group relative cursor-default select-none py-2 pl-3 pr-9 ${
                  select?.some((p) => p?.id === person?.id)
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900"
                }`}
                onClick={() => handleSelect(person)}
              >
                <span
                  className={`block truncate font-normal ${
                    select?.some((p) => p.id === person.id)
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {person.name}
                </span>

                {select?.some((p) => p.id === person.id) && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </div>
    </Listbox>
  );
};
