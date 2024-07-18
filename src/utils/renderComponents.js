import Clients from "../Components/Clients";
import Projects from "../Components/Projects";
import Dashboard from "../Components/Dashboard";
import Invoices from "../Components/Invoices";
import Schedules from "../Components/Schedules";
import Reports from "../Components/Reports";
import Contact from "../Components/Contact";
import Settings from "../Components/Settings";
import Docs from "../Components/Docs";
import ClientReport from "../Components/ClientReport/ClientReport";
import Revenue from "../Components/Revenue/Revenue";
import Expense from "../Components/Expense/Expense";
import ProfitLoss from "../Components/ProfitLoss/ProfitLoss";

export const renderComponent = (path) => {
  switch (path) {
    case "client":
      return <Clients />;
    case "project":
      return <Projects />;
    case "invoice":
      return <Invoices />;
    case "schedule":
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
    case "setting":
      return <Settings />;
    case "docs":
      return <Docs />;
    default:
      return <Dashboard />;
  }
};
