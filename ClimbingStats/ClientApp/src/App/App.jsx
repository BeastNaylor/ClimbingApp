import React, { Component } from "react";
import { Route } from "react-router";
import Layout from "../components/Layout";
import Home from "../components/Home";
import { FetchData } from "../components/FetchData";
import { Counter } from "../components/Counter";
import Routes from "../components/Routes";
import Summary from "../components/Summary";
import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/routes' component={Routes} />
        <Route path='/summary' component={Summary} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
