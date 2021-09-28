import React, { useState, useEffect } from "react";
import axios from "axios";
import StorageCheck from "../lib/StorageCheck";

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
    const summary = await axios.get("api/route/summary");
    const colours = await axios.get("api/route/colours");
    const sections = await axios.get("api/route/sections");
    setState({
      summary: summary.data,
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
                  {renderSectionTotals(section, colour, state.summary)}
                </td>
              ))}
              <td>{renderSectionTotals("total", colour, state.summary)}</td>
            </tr>
          ))}
          <tr key="total">
            <td>Total</td>
            {state.sections.map((section) => (
              <td key={section}>
                {renderSectionTotals(section, "total", state.summary)}
              </td>
            ))}
            <td>{renderSectionTotals("total", "total", state.summary)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderSectionTotals = (section, colour, summary) => {
    let routes = [];
    let validColours = [];
    if (colour in summary) {
      validColours = summary[colour];
    } else if (colour === "total") {
      for (var key in summary) {
        for (var prop in summary[key]) {
          if (!(prop in validColours)) {
            validColours[prop] = [];
          }
          for (var route in summary[key][prop]) {
            validColours[prop].push(summary[key][prop][route]);
          }
        }
      }
    }

    if (section in validColours) {
      routes = validColours[section];
    } else if (section === "total") {
      for (var key in validColours) {
        for (var route in validColours[key]) {
          routes.push(validColours[key][route]);
        }
      }
    }

    const climbedRoutes = routes.filter((route) => StorageCheck(route.id));

    let contents =
      routes.length === 0 ? (
        "-"
      ) : (
        <>
          {climbedRoutes.length} / {routes.length}
        </>
      );
    return contents;
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
