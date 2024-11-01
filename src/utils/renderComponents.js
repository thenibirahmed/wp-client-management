import React, { lazy } from "react";

const Dashboard = lazy(() => import("../Components/Dashboard/Dashboard"));
const Invoices = lazy(() => import("../Components/Invoices/Invoices"));
const Schedules = lazy(() => import("../Components/schedules/Schedules"));
const Contact = lazy(() => import("../Components/Contacts/Contact"));
const Settings = lazy(() => import("../Components/Settings"));
const Docs = lazy(() => import("../Components/Docs"));
const ClientReport = lazy(() =>
  import("../Components/ClientReport/ClientReport")
);
const Revenue = lazy(() => import("../Components/Revenue/Revenue"));
const Expense = lazy(() => import("../Components/Expense/Expense"));
const ProfitLoss = lazy(() => import("../Components/ProfitLoss/ProfitLoss"));
const Client = lazy(() => import("../Components/Clients/Client"));
const Projects = lazy(() => import("../Components/Projects/Projects"));
const ClientDetails = lazy(() => import("../Components/Clients/ClientDetails"));
const ProjectDetail = lazy(() =>
  import("../Components/Projects/ProjectDetail")
);
const ProjectTaskDetails = lazy(() =>
  import("../Components/Projects/ProjectTask/ProjectTaskDetails")
);
const ContactTeamDetails = lazy(() =>
  import("../Components/Contacts/Team/TeamDetails/ContactTeamDetails")
);
const Errors = lazy(() => import("../Components/Errors"));
const LogIn = lazy(() => import("../Components/LogIn/LogIn"));

export const renderComponent = (path, activeUrl, paginationUrl) => {
  switch (path) {
    case "clients":
      return <Client />;

    case `clients/?${paginationUrl}`:
      return <Client />;

    case `clients/#/${activeUrl}`:
      return <ClientDetails />;
    case "projects":
      return <Projects />;
    case `projects/?${paginationUrl}`:
      return <Projects />;

    case `projects/#/${activeUrl}/#/Task`:
      return <ProjectTaskDetails />;

    case `projects/#/${activeUrl}`:
      return <ProjectDetail />;

    case "invoices":
      return <Invoices />;
    case `invoices/?${paginationUrl}`:
      return <Invoices />;
    case "schedules":
      return <Schedules />;
    case `schedules/?${paginationUrl}`:
      return <Schedules />;
    case "report/#/client-report":
      return <ClientReport />;
    case "report/#/revenue":
      return <Revenue />;
    case "report/#/expense":
      return <Expense />;
    case "report/#/profit":
      return <ProfitLoss />;
    case "contact":
      return <Contact />;
    case `contact/?${paginationUrl}`:
      return <Contact />;
    case `contact/#/${activeUrl}`:
      return <ContactTeamDetails />;
    case `contact/#/${activeUrl}/?${paginationUrl}`:
      return <ContactTeamDetails />;
    case "setting":
      return <Settings />;
    case "docs":
      return <Docs />;
    case "error":
      return <Errors />;
    case "login":
      return <LogIn />;
    default:
      return <Dashboard />;
  }
};
