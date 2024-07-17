import React from "react";
import "./Styles/tailwind.scss";
import "./Styles/style.scss";
import AppLayout from "./Components/Layouts/AppLayout";

import { renderComponent } from "./utils/renderComponents";
import useHashRouting from "./utils/useHashRouting";

export const App = () => {
  const currentComponent = useHashRouting("");

  return (
    <React.Fragment>
      <AppLayout>{renderComponent(currentComponent)}</AppLayout>
    </React.Fragment>
  );
};
