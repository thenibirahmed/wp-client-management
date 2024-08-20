import React, { createContext, useContext, useState, useEffect } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [openTask, setOpenTask] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [createInvoice, setCreateInvoice] = useState(false);
  const [createNote, setCreateNote] = useState(false);
  const [createEmail, setCreateEmail] = useState(false);
  const [openTaskDetail, setOpenTaskDetail] = useState(false);

  const [allTabItems, setAllTabItems] = useState({
    project: true,
    task: true,
    invoice: false,
    note: false,
    file: false,
    email: false,
    info: false,
  });
  const [contactTabs, setContactTabs] = useState({
    team: true,
    client: false,
  });

  const [selectedViewEmail, setSelectedViewEmail] = useState("");

  const sendData = {
    openTask,
    setOpenTask,
    openProjectModal,
    setOpenProjectModal,
    allTabItems,
    setAllTabItems,
    createInvoice,
    setCreateInvoice,
    createNote,
    setCreateNote,
    openFileModal,
    setOpenFileModal,
    createEmail,
    setCreateEmail,
    openEmailModal,
    setOpenEmailModal,
    selectedViewEmail,
    setSelectedViewEmail,
    openTaskDetail,
    setOpenTaskDetail,
    contactTabs,
    setContactTabs,
  };

  return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>;
};

export const useStoreContext = () => {
  const context = useContext(ContextApi);

  return context;
};
