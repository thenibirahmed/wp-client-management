import React from "react";
import { OvierViewItem } from "../helper/OverViewItem";

const ProjectOverView = ({ projectOverView, projectDetails = false }) => {
  return (
    <React.Fragment>
      <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
        Projects Overview
      </h1>
      <div className="flex   w-full  sm:flex-row flex-col  sm:justify-between  items-center border border-borderColor rounded-lg">
        <OvierViewItem
          title={projectOverView?.due?.name}
          amount={projectOverView?.due?.total}
          invoice={projectOverView?.due?.subText}
        />{" "}
        <OvierViewItem
          title={projectOverView?.invoice?.name}
          amount={projectOverView?.invoice?.total}
          invoice={projectOverView?.invoice?.subText}
        />
        {projectDetails ? (
          <OvierViewItem
            isProject
            title={projectOverView?.employee?.name}
            amount={projectOverView?.employee?.amount}
            invoice={projectOverView?.employee?.subText}
          />
        ) : (
          <OvierViewItem
            isProject
            title={projectOverView?.projects?.name}
            amount={projectOverView?.projects?.count}
            invoice={projectOverView?.projects?.subText}
          />
        )}{" "}
        <OvierViewItem
          title={projectOverView?.revenue?.name}
          amount={projectOverView?.revenue?.total}
          invoice={projectOverView?.revenue?.subText}
        />
      </div>
    </React.Fragment>
  );
};

export default ProjectOverView;
