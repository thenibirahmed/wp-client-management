import React, { createContext, useContext, useState, useEffect } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);
  const [createInvoice, setCreateInvoice] = useState(false);
  const [createNote, setCreateNote] = useState(false);
  const defaultTabValues = localStorage.getItem("tab")
    ? JSON.parse(localStorage.getItem("tab"))
    : {
        project: true,
        invoice: false,
        note: false,
        file: false,
        email: false,
        info: false,
      };

  const [allTabItems, setAllTabItems] = useState(defaultTabValues);

  useEffect(() => {
    localStorage.setItem("tab", JSON.stringify(allTabItems));
  }, [allTabItems]);

  const sendData = {
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
  };
  return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>;
};

export const useStoreContext = () => {
  const context = useContext(ContextApi);

  return context;
};
