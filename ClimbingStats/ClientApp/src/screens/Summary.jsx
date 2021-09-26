import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
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
      colours: colours.data,
      sections: sections.data,
      loading: false,
    });
  };

  const renderRoutesTable = (state) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Colour</th>
            {state.sections.map((section) => (
              <th key={section}>{section}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {state.colours.map((colour) => (
            <tr key={colour}>
              <td>{colour}</td>
              {state.sections.map((section) => (
                <td key={section}>
                  {renderSectionTotals(section, colour, state.routes)}
                </td>
              ))}
              <td>{renderSectionTotals("total", colour, state.routes)}</td>
            </tr>
          ))}
          <tr key="total">
            <td>Total</td>
            {state.sections.map((section) => (
              <td key={section}>
                {renderSectionTotals(section, "total", state.routes)}
              </td>
            ))}
            <td>{renderSectionTotals("total", "total", state.routes)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderSectionTotals = (section, colour, routes) => {
    const validRoutes = routes.filter(
      (route) =>
        (route.section === section || section === "total") &&
        (route.colour === colour || colour === "total")
    );
    let savedClimbs = JSON.parse(localStorage.getItem("climbed"));
    savedClimbs = savedClimbs == null ? [] : savedClimbs;
    const climbedRoutes = validRoutes.filter(
      (route) =>
        savedClimbs.filter((climbed) => climbed.id === route.id).length > 0
    );
    return (
      <>
        {climbedRoutes.length} / {validRoutes.length}
      </>
    );
  };

  let contents = state.loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderRoutesTable(state)
  );

  return (
    <div>
      <h1 id="tabelLabel">Summary</h1>
      {contents}
    </div>
  );
};

export default Summary;
