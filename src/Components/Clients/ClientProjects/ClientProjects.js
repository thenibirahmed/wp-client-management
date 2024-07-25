import React, { useState } from "react";
import {
  CheckmarkCircle02Icon,
  Delete03Icon,
  Invoice01Icon,
  UserAdd02Icon,
} from "../../../utils/icons";

import EmptyTable from "../../helper/EmptyTable";
import { ClientProjectSearch } from "./ClientProjectSearch";
import ClientProjectFilter from "./ClientProjectFilter";
import { ClientProjectModal } from "./ClientProjectModal";
import ClientOverView from "../ClientOverView";
import ClientInfo from "./ClientInfo";
import ClientProjectTable from "./ClientProjectTable";

const ClientProjects = () => {
  const [open, setOpen] = useState(false);
  const dataList = [1];
  return (
    <React.Fragment>
      <ClientInfo />
      <ClientOverView />
      <div className="space-y-6">
        <div className="flex md:flex-row  md:justify-between flex-col md:items-center md:gap-0 gap-4">
          <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
            Projects
          </h1>
          <div className="flex sm:flex-row flex-wrap gap-5 items-center">
            <button>
              <Delete03Icon className="text-textColor2" />
            </button>
            <button>
              <CheckmarkCircle02Icon className="text-textColor2" />
            </button>
            <ClientProjectFilter />

            <ClientProjectSearch />
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-customBlue px-5 py-[10px] text-sm font-semibold text-white shadow-sm  hover:text-gray-200 "
            >
              <UserAdd02Icon
                aria-hidden="true"
                className="text-white hover:text-gray-200"
              />
              Add Project
            </button>
          </div>
        </div>

        <React.Fragment>
          {dataList.length > 0 ? (
            <>
              <ClientProjectTable />
            </>
          ) : (
            <>
              <EmptyTable
                Icon={Invoice01Icon}
                setOpen={setOpen}
                title="Projects Await Initiation"
                subtitle="Initiate your first project now."
                btnText="Add Project"
              />
            </>
          )}
        </React.Fragment>
      </div>

      <ClientProjectModal open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export default ClientProjects;
