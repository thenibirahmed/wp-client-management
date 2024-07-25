import React from "react";
import "./Styles/tailwind.scss";
import "./Styles/eic-frontend-style.scss";
import AppLayout from "./Components/Layouts/AppLayout";

import { renderComponent } from "./utils/renderComponents";
import useHashRouting from "./utils/useHashRouting";
import { ContextProvider } from "./store/ContextApiStore";

export const App = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");

  return (
    <ContextProvider>
      <AppLayout>{renderComponent(currentPath, pathArray[1])}</AppLayout>
    </ContextProvider>
  );
};
