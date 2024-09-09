import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import useHashRouting from "../../utils/useHashRouting";

function extractContent(str) {
  return str
    .split(/[\/#?=]+/) // Split on '/', '#', '?', or '=' characters
    .filter(Boolean) // Remove empty elements
    .map((word, index, arr) => {
      if (index === arr.length - 2) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    });
}
const BreadCrum = () => {
  const currentPath = useHashRouting("");

  console.log("breadcrum main ", currentPath);
  const breadcrum = extractContent(currentPath);
  console.log("breadcrum ", breadcrum);
  return (
    <nav aria-label="Breadcrumb" className="flex font-metropolis">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div className="flex gap-2  items-center">
            <HomeIcon aria-hidden="true" className=" w-5 flex-shrink-0" />
            <span className="text-textColor font-medium text-sm  mt-1">
              Home
            </span>
          </div>
        </li>
        {breadcrum.map((item, i) => (
          <li key={i} className="mt-[2px]">
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-gray-400"
              />
              <a
                aria-current="page"
                className="ml-2 text-sm font-medium text-gray-500 "
              >
                {item}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrum;
