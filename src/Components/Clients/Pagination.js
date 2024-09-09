import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

const Pagination = () => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-textColor2 font-normal font-metropolis">
            Showing <span className="font-semibold text-textColor ">1</span> -{" "}
            <span className="font-semibold text-textColor">10</span> of{" "}
            <span className="font-semibold text-textColor">97</span>
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                aria-hidden="true"
                className="h-5 w-5 text-textColor"
              />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="/admin/#/projects/?page=1"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-customBg6 ring-1 ring-inset ring-borderColor text-customBlue px-4 py-2 text-sm font-medium font-metropolis  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="/admin/#/projects/?page=2"
              className="relative z-10 inline-flex items-center bg-white text-textColor ring-1 ring-inset ring-borderColor px-4 py-2 text-sm font-medium font-metropolis  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              2
            </a>

            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-textColor ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>

            <a
              href="#"
              className="relative z-10 inline-flex items-center bg-white text-textColor ring-1 ring-inset ring-borderColor px-4 py-2 text-sm font-medium font-metropolis  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 text-textColor"
              />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
