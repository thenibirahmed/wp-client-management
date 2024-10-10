import React from "react";
import "./Styles/tailwind.scss";
import "./Styles/eic-frontend-style.scss";
import AppLayout from "./Components/Layouts/AppLayout";

import { renderComponent } from "./utils/renderComponents";
import useHashRouting from "./utils/useHashRouting";
import { ContextProvider } from "./store/ContextApiStore";
import { Toaster } from "react-hot-toast";
import LogIn from "./Components/LogIn/LogIn";

export const App = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "page=1";

  // console.log("currentPath", currentPath);
  // console.log("pathArray", pathArray);
  //console.log("getPaginationUrl", getPaginationUrl);
  console.log("pathArray", pathArray);

  const isLoginPage = pathArray[0] === "login";

  return (
    <ContextProvider>
      {isLoginPage ? (
        <LogIn />
      ) : (
        <AppLayout>
          <Toaster position="bottom-center" reverseOrder={false} />
          {renderComponent(currentPath, pathArray[1], paginationUrl)}
        </AppLayout>
      )}
    </ContextProvider>
  );
};
