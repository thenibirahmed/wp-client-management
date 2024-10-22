import { useState, useEffect } from "react";
import { Search01Icon } from "../../utils/icons";

export const ClientSearchInput = ({ setSearchText, searchText }) => {
  const [inputValue, setInputValue] = useState(searchText);

  useEffect(() => {
    setInputValue(searchText);
  }, [searchText]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchText(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearchText]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="rounded-md relative shadow-sm ml-0">
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <Search01Icon aria-hidden="true" className="h-5 w-5 text-textColor2" />
      </div>
      <input
        value={inputValue}
        onChange={handleChange}
        type="text"
        placeholder="Search"
        className="block outline-none rounded-md xl:w-80 sm:w-60 w-[100%] border-0 py-[9px] pl-12 text-textColor2 ring-1 ring-inset ring-borderColor placeholder:text-textColor2 focus:ring-2 focus:ring-inset focus:ring-borderColor sm:text-sm sm:leading-6"
      />
    </div>
  );
};
