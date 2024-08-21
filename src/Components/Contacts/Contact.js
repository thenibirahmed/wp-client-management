import React, { useState, useEffect } from "react";

import { useStoreContext } from "../../store/ContextApiStore";

import ContactTabs from "./ContactTabs";
import ContactTabLayout from "./ContactTabLayout";

const Contact = () => {
  const { contactTabs, setContactTabs } = useStoreContext();

  useEffect(() => {
    setContactTabs({
      team: true,
      client: false,
    });
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1 className="font-metropolis font-semibold  text-textColor text-[30px] leading-[45px]">
          Contact Book
        </h1>
      </div>
      <ContactTabs />
      <div className="space-y-6">
        <ContactTabLayout />
      </div>
    </React.Fragment>
  );
};

export default Contact;
