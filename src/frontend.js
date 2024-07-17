import React from "react";
import ReactDOM from "react-dom";
import "./Styles/tailwind.scss";
import "./Styles/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Components/Test";
import Layouts from "./Components/Layout";
import Table from "./Components/Table";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Layouts />}>
          <Route path="" element={<Test />} />
          <Route path="clients" element={<Table />} />
          <Route path="projects" element={<Test />} />
        </Route>
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById("wp-client-management-root");
ReactDOM.render(<App />, rootElement);
