import Clients from "../Components/Clients";
import Projects from "../Components/Projects";
import Dashboard from "../Components/Dashboard";
import Invoices from "../Components/Invoices";
import Schedules from "../Components/Schedules";
import Reports from "../Components/Reports";
import Contact from "../Components/Contact";
import Settings from "../Components/Settings";

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
		case "report":
			return <Reports />;
		case "contact":
			return <Contact />;
		case "setting":
			return <Settings />;
		default:
			return <Dashboard />;
	}
};
