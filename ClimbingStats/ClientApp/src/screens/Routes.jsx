import React, { useState, useEffect } from "react";
import axios from "axios";

const Routes = () => {
  const [state, setState] = useState({
    routes: [],
    loading: true,
  });

  useEffect(() => {
    populateRoutes();
  }, []);

  const populateRoutes = async () => {
    const routes = await axios("api/route");
    setState({
      routes: routes.data,
      loading: false,
    });
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
          {routes.map((route) => (
            <tr key={route.id}>
              <td>{route.id}</td>
              <td>{route.section}</td>
              <td>{route.position}</td>
              <td>{route.colour}</td>
              <td></td>
            </tr>
          ))}
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
    </div>
  );
};

export default Routes;
