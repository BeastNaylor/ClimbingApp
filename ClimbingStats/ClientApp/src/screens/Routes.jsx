import React, { useState, useEffect } from "react";
import axios from "axios";
import StorageCheck from "../lib/StorageCheck";
import Cafe from "../maps/Cafe";
import "../maps/Maps.css";

const Routes = () => {
  const [state, setState] = useState({
    routes: [],
    loading: true,
    routeMap: [],
  });

  useEffect(() => {
    populateRoutes();
  }, []);

  const populateRoutes = async () => {
    const routes = await axios("api/route");
    setState({
      routes: routes.data,
      loading: false,
      routeMap: mapRoutes(routes.data),
    });
  };

  const mapRoutes = (routes) => {
    const routeMap = {};
    for (const route in routes) {
      const routeId = routes[route].section + "" + routes[route].position;
      const isCompleted = StorageCheck(routes[route].id) ? " Completed" : "";
      routeMap[routeId] = routes[route].colour + isCompleted;
    }
    return routeMap;
  };

  const renderRoutesTable = (routes) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Section</th>
            <th>Position</th>
            <th>Colour</th>
            <th>Climbed?</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => {
            const climbed = StorageCheck(route.id) ? "Yes" : "No";
            return (
              <tr key={route.id}>
                <td>{route.id}</td>
                <td>{route.section}</td>
                <td>{route.position}</td>
                <td>{route.colour}</td>
                <td>{climbed}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  let contents = state.loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderRoutesTable(state.routes)
  );

  return (
    <div>
      <h1 id="tabelLabel">Routes</h1>
      {contents}
      <Cafe routes={state.routeMap} />
    </div>
  );
};

export default Routes;
