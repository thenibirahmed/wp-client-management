import React, { useEffect, useState } from "react";
import { render } from "react-dom";

import Dashboard from "./Components/Dashboard";
import Invoices from "./Components/Invoices";

import Schedules from "./Components/Schedules";
import Reports from "./Components/Reports";
import Settings from "./Components/Settings";
import PlayGround from "./Components/PlayGround";
import Client from "./Components/Clients/Client";
import Projects from "./Components/Projects/Projects";

const App = () => {
  const [hash, setHash] = useState(window.location.hash || "#");

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash || "#");
    window.addEventListener("hashchange", handleHashChange);

    const handleMenuClick = (e) => {
      const target = e.target.closest("a");
      if (
        target &&
        target.href.includes("admin.php?page=wp-client-management")
      ) {
        e.preventDefault();
        const newHash = target.hash || "#";
        if (newHash !== window.location.hash) {
          window.location.hash = newHash;
        } else {
          setHash(newHash);
        }
      }
    };

    // Prevent page reload on menu clicks
    document
      .querySelectorAll('a[href*="admin.php?page=wp-client-management"]')
      .forEach((link) => {
        link.addEventListener("click", handleMenuClick);
      });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document
        .querySelectorAll('a[href*="admin.php?page=wp-client-management"]')
        .forEach((link) => {
          link.removeEventListener("click", handleMenuClick);
        });
    };
  }, []);

  useEffect(() => {
    // Add 'current' class to the active menu item
    const menuItems = document.querySelectorAll(
      'li a[href*="admin.php?page=wp-client-management"]'
    );
    menuItems.forEach((item) => {
      if (item.hash === hash || (item.hash === "" && hash === "#")) {
        item.parentElement.classList.add("current");
      } else {
        item.parentElement.classList.remove("current");
      }
    });
  }, [hash]);

  let component;
  switch (hash) {
    case "#clients":
      component = <Client />;
      break;
    case "#projects":
      component = <Projects />;
      break;
    case "#invoices":
      component = <Invoices />;
      break;
    case "#schedules":
      component = <Schedules />;
      break;
    case "#reports":
      component = <Reports />;
      break;
    case "#settings":
      component = <Settings />;
      break;
    case "#playground":
      component = <PlayGround />;
      break;
    default:
      component = <Dashboard />;
      break;
  }

  return <div>{component}</div>;
};

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.getElementById("wp-client-management-root"));
});
