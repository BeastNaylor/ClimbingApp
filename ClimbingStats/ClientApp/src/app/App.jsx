import React from "react";
import { Route } from "react-router";
import Layout from "../components/Layout";
import Home from "../screens/Home";
import Summary from "../screens/Summary";
import Edit from "../screens/Edit";
import Routes from "../screens/Routes";
import { BrowserRouter } from "react-router-dom";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");

const App = () => {
  return (
    <BrowserRouter basename={baseUrl}>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/routes" component={Routes} />
        <Route path="/summary" component={Summary} />
        <Route path="/edit" component={Edit} />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
