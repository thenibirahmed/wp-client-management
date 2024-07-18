import { HomeIcon } from "@heroicons/react/24/outline";
import React from "react";

const BreadCrum = () => {
  return (
    <>
      <nav aria-label="Breadcrumb" className="flex">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 flex items-center"
              >
                <HomeIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0  text-textColor"
                />
                <span className="ml-4 text-sm font-medium text-textColor hover:text-gray-700">
                  Dashboard
                </span>
              </a>
            </div>
          </li>
        </ol>
      </nav>
    </>
  );
};

export default BreadCrum;
