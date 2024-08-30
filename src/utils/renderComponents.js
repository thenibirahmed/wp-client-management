import Dashboard from "../Components/Dashboard";
import Invoices from "../Components/Invoices";
import Schedules from "../Components/Schedules";
import Contact from "../Components/Contacts/Contact";
import Settings from "../Components/Settings";
import Docs from "../Components/Docs";
import ClientReport from "../Components/ClientReport/ClientReport";
import Revenue from "../Components/Revenue/Revenue";
import Expense from "../Components/Expense/Expense";
import ProfitLoss from "../Components/ProfitLoss/ProfitLoss";
import Client from "../Components/Clients/Client";
import Projects from "../Components/Projects/Projects";

import ClientDetails from "../Components/Clients/ClientDetails";
import ProjectDetail from "../Components/Projects/ProjectDetail";
import ProjectTaskDetails from "../Components/Projects/ProjectTask/ProjectTaskDetails";
import ContactTeamDetails from "../Components/Contacts/Team/TeamDetails/ContactTeamDetails";

export const renderComponent = (path, activeUrl) => {
  switch (path) {
    case "clients":
      return <Client />;
    case `clients/#/${activeUrl}`:
      return <ClientDetails />;
    case "projects":
      return <Projects />;

    case `projects/#/${activeUrl}/#/Task`:
      return <ProjectTaskDetails />;

    case `projects/#/${activeUrl}`:
      return <ProjectDetail />;

    case "invoices":
      return <Invoices />;
    case "schedules":
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
    case `contact/#/${activeUrl}`:
      return <ContactTeamDetails />;
    case "setting":
      return <Settings />;
    case "docs":
      return <Docs />;
    default:
      return <Dashboard />;
  }
};
