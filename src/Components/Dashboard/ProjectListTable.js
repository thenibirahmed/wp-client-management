import React from "react";

const ProjectListTable = ({ projectData }) => {
  return (
    <div>
      {" "}
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1  ring-black ring-opacity-5 sm:rounded-lg">
            <table className="xl:min-w-full min-w-[1000px] divide-y divide-borderColor ">
              <thead className="bg-gray-50  ">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 uppercase    pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    Project Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 uppercase    pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    Task
                  </th>{" "}
                  <th
                    scope="col"
                    className="py-3.5 uppercase    pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    Client
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {projectData?.map((item) => {
                  let itemStatus = item?.status?.toLowerCase();

                  const statusClass =
                    itemStatus === "completed"
                      ? "bg-customBg1 text-green"
                      : itemStatus === "on hold"
                      ? "bg-customBg2 text-textColor"
                      : itemStatus === "cancelled"
                      ? "bg-customBg3 text-red2"
                      : itemStatus === "in progress"
                      ? "bg-customBg4 text-purple"
                      : itemStatus === "in review"
                      ? "bg-customBg5 text-customRed2"
                      : "bg-customBg1 text-green";

                  return (
                    <tr className="cursor-pointer">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6 ">
                        <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                          {item.name}
                        </h3>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6 ">
                        <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                          {item.tasks}
                        </h3>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-2 pr-3  sm:pl-4 ">
                        <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                          {item.created_at}
                        </h3>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6 ">
                        <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                          {item.client}
                        </h3>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm  font-metropolis font-medium">
                        <span
                          className={`${statusClass} py-[2px] px-[10px] font-metropolis font-medium text-xs rounded-[5px]`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* <Pagination
              pagination={pagination}
              slug="projects"
              query="/?project"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectListTable;
