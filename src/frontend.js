import ReactDOM from "react-dom";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const rootElement = document.getElementById("wp-client-management-root");
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,

  rootElement
);
