import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const ClientInvoiceFilter = () => {
  return (
    <Menu as="div" className="relative inline-block text-left ml-4">
      <div>
        <MenuButton className="flex w-32  justify-between gap-x-1.5 rounded-md  p-[10px] bg-white text-textColor2 border border-borderColor   text-sm font-semibold  shadow-sm ring-1 ring-inset ring-textColor2 hover:bg-gray-50">
          <div className="flex-1 flex items-center gap-1">
            <ChevronDownIcon
              aria-hidden="true"
              className=" h-5  text-textColor2"
            />
            <span>Filter</span>
          </div>
          <ChevronDownIcon
            aria-hidden="true"
            className=" h-5 w-5 text-textColor2"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-textColor2 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-textColor2 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-textColor2 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              License
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-textColor2 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ClientInvoiceFilter;
