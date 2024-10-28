import React, { Suspense, lazy } from "react";
import "./Styles/tailwind.scss";
import "./Styles/eic-frontend-style.scss";
import { Toaster } from "react-hot-toast";

import { renderComponent } from "./utils/renderComponents";
import useHashRouting from "./utils/useHashRouting";
import { ContextProvider } from "./store/ContextApiStore";
import AppLayout from "./Components/Layouts/AppLayout";
import Skeleton from "./Components/Skeleton";

const LogIn = lazy(() => import("./Components/LogIn/LogIn"));

export const App = () => {
  const currentPath = useHashRouting("");
  const pathArray = currentPath?.split("/#/");
  const getPaginationUrl = currentPath?.split("?")[1];
  const paginationUrl = getPaginationUrl ? getPaginationUrl : "page=1";

  const isLoginPage = pathArray[0] === "login";

  return (
    <ContextProvider>
      {isLoginPage ? (
        <Suspense fallback={<Skeleton />}>
          <LogIn />
        </Suspense>
      ) : (
        <AppLayout>
          <Suspense fallback={<Skeleton />}>
            <Toaster position="bottom-center" reverseOrder={false} />
            {renderComponent(currentPath, pathArray[1], paginationUrl)}
          </Suspense>
        </AppLayout>
      )}
    </ContextProvider>
  );
};
