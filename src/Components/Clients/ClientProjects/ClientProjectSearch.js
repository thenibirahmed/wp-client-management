/*
  This example requires some changes to your config:
  
  
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  
*/

import { Search01Icon } from "../../../utils/icons";

export const ClientProjectSearch = () => {
  return (
    <div className="rounded-md relative shadow-sm ml-0">
      <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center ">
        <Search01Icon aria-hidden="true" className="h-5 w-5 text-textColor2" />
      </div>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="search"
        className="block outline-none rounded-md xl:w-80  w-60 border-0 py-[9px] pl-10 text-textColor2 ring-1 ring-inset ring-textColor2 placeholder:text-textColor2 focus:ring-2 focus:ring-inset focus:ring-textColor sm:text-sm sm:leading-6"
      />
    </div>
  );
};
