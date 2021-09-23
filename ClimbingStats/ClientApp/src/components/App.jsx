import React from "react";
import { Route } from "react-router";
import Layout from "./Layout";
import Home from "./Home";
import Routes from "./Routes";
import Summary from "./Summary";

const App = () => {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/routes' component={Routes} />
      <Route path='/summary' component={Summary} />
    </Layout>
  );
};

export default App;
