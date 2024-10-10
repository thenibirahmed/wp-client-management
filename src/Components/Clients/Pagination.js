import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const defaultValue = {
  current_page: 1,
  last_page: null,
  prev_page_url: null,
  next_page_url: null,
  slug: "projects",
  query: "/?page",
  projectId: null,
};

const Pagination = ({ pagination = defaultValue, slug, query, projectId }) => {
  const { current_page, last_page, prev_page_url, next_page_url } = pagination;
  const nextPageNumber = next_page_url?.split("=")[1];
  const prevPgeNumber = prev_page_url?.split("=")[1];

  const prevPageUrl = projectId
    ? `#/${slug}/#/${projectId}${query}=${prevPgeNumber}`
    : `#/${slug}${query}=${prevPgeNumber}`;

  const nextPageUrl = projectId
    ? `#/${slug}/#/${projectId}${query}=${nextPageNumber}`
    : `#/${slug}${query}=${nextPageNumber}`;

  const renderPageNumbers = () => {
    const pages = [];

    if (current_page <= 3) {
      for (let i = 1; i <= Math.min(3, last_page); i++) {
        pages.push(i);
      }
    } else {
      pages.push(current_page - 2, current_page - 1, current_page);
    }

    if (current_page < last_page - 2) {
      pages.push("...");
    }

    if (last_page > 3 && current_page < last_page) {
      pages.push(last_page);
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={index}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400"
          >
            ...
          </span>
        );
      }

      return (
        <a
          key={index}
          href={
            projectId
              ? `#/${slug}/#/${projectId}${query}=${page}`
              : `#/${slug}${query}=${page}`
          }
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium font-metropolis ${
            page === current_page
              ? "bg-customBg6 text-customBlue ring-borderColor"
              : "bg-white text-textColor ring-borderColor hover:bg-gray-50"
          } ring-1 ring-inset focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          {page}
        </a>
      );
    });
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-textColor2 font-normal font-metropolis">
            Showing{" "}
            <span className="font-semibold text-textColor">
              {(current_page - 1) * pagination.per_page + 1}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-textColor">
              {Math.min(current_page * pagination.per_page, pagination.total)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-textColor">
              {pagination.total}
            </span>
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <a
              href={prev_page_url ? prevPageUrl : null}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${
                prev_page_url
                  ? "text-gray-400 ring-gray-300 hover:bg-gray-50"
                  : "text-gray-300 ring-gray-200 cursor-not-allowed"
              }`}
              aria-disabled={!prev_page_url}
              tabIndex={prev_page_url ? 0 : -1}
              onClick={(e) => !prev_page_url && e.preventDefault()}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                aria-hidden="true"
                className={`h-5 w-5 ${
                  prev_page_url ? "text-textColor" : "text-gray-300"
                }`}
              />
            </a>

            {renderPageNumbers()}

            <a
              href={next_page_url ? nextPageUrl : null}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${
                next_page_url
                  ? "text-gray-400 ring-gray-300 hover:bg-gray-50"
                  : "text-gray-300 ring-gray-200 cursor-not-allowed"
              }`}
              aria-disabled={!next_page_url}
              tabIndex={next_page_url ? 0 : -1}
              onClick={(e) => !next_page_url && e.preventDefault()}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                aria-hidden="true"
                className={`h-5 w-5 ${
                  next_page_url ? "text-textColor" : "text-gray-300"
                }`}
              />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
