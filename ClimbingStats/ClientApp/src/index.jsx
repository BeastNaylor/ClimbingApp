import React from "react";
import ReactDom from "react-dom";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");

ReactDom.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
