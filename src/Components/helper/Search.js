import { useState, useEffect } from "react";

import { Search01Icon } from "../../utils/icons";

export const Search = ({ setSearchText }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchText(inputValue);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearchText]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="rounded-md relative shadow-sm ml-0">
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center ">
        <Search01Icon aria-hidden="true" className="h-5 w-5 text-textColor2" />
      </div>
      <input
        value={inputValue}
        onChange={handleChange}
        id="email"
        name="email"
        type="email"
        placeholder="Search"
        className="block outline-none rounded-md xl:w-80  w-60 border-0 py-[9px] pl-12 text-textColor2 ring-1 ring-inset ring-borderColor placeholder:text-textColor2 focus:ring-2 focus:ring-inset focus:ring-borderColor sm:text-sm sm:leading-6"
      />
    </div>
  );
};
