import React, { createContext, useContext, useState, useEffect } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [openTask, setOpenTask] = useState(false);
  const [openUpdateTask, setOpenUpdateTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  const [createClient, setCreateClient] = useState(false);
  const [updateClient, setUpdateClient] = useState(false);
  const [deleteClient, setDeleteClient] = useState(false);

  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openProjectUpdateModal, setOpenProjectUpdateModal] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);

  const [openFileModal, setOpenFileModal] = useState(false);
  const [updateFileModal, setUpdateFileModal] = useState(false);
  const [deleteFileModal, setDeleteFileModal] = useState(false);

  const [openEmailModal, setOpenEmailModal] = useState(false);

  const [createInvoice, setCreateInvoice] = useState(false);
  const [updateInvoice, setUpdateInvoice] = useState(false);

  const [createNote, setCreateNote] = useState(false);
  const [deleteNote, setDeleteNote] = useState(false);

  const [createEmail, setCreateEmail] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState(false);

  const [openTaskDetail, setOpenTaskDetail] = useState(false);
  const [openTaskDesc, setOpenTaskDesc] = useState(false);
  const [taskId, setTaskId] = useState(false);

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
  const [contactTeamDetailsTabs, setContactTeamDetailsTabs] = useState({
    project: true,
    task: false,
  });

  const [selectedViewEmail, setSelectedViewEmail] = useState("");

  const sendData = {
    openTask,
    setOpenTask,
    openUpdateTask,
    setOpenUpdateTask,
    openProjectModal,
    setOpenProjectModal,
    openProjectUpdateModal,
    setOpenProjectUpdateModal,
    allTabItems,
    setAllTabItems,
    createInvoice,
    updateInvoice,
    setUpdateInvoice,
    setCreateInvoice,
    createNote,
    setCreateNote,
    openFileModal,
    setOpenFileModal,
    updateFileModal,
    setUpdateFileModal,
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
    contactTeamDetailsTabs,
    setContactTeamDetailsTabs,
    openTaskDesc,
    setOpenTaskDesc,
    taskId,
    setTaskId,
    createClient,
    setCreateClient,
    updateClient,
    setUpdateClient,
    deleteClient,
    setDeleteClient,
    deleteProject,
    setDeleteProject,
    deleteFileModal,
    setDeleteFileModal,
    deleteNote,
    setDeleteNote,
    deleteEmail,
    setDeleteEmail,
    deleteTask,
    setDeleteTask,
  };

  return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>;
};

export const useStoreContext = () => {
  const context = useContext(ContextApi);

  return context;
};
