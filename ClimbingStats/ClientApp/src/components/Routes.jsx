import React, { useState, useEffect } from "react";
import axios from "axios";

const Routes = () => {
  const [state, setState] = useState({
    colours: [],
    sections: [],
    routes: [],
    loading: true,
  });

  useEffect(() => {
    populateSummary();
  }, []);

  const populateSummary = async () => {
    const response = await fetch("api/route");
    const colours = await axios.get("api/route/colours");
    const sections = await axios.get("api/route/sections");
    const data = await response.json();
    setState({
      routes: data,
      colours: colours,
      sections: sections,
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
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
    </div>
  );
};

export default Routes;
