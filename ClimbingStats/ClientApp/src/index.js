import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App.jsx";
import { BrowserRouter } from "react-router-dom";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />{" "}
  </BrowserRouter>,
  document.getElementById("root")
);
