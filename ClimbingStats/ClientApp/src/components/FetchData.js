import React, { Component } from "react";

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { routes: [], loading: true };
  }

  componentDidMount() {
    this.populateRoutes();
  }

  static renderRoutesTable(routes) {
    return (
      <table className='table table-striped' aria-labelledby='tabelLabel'>
        <thead>
          <tr>
            <th>Section</th>
            <th>Position</th>
            <th>Colour</th>
            <th>Climbed?</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td>{route.section}</td>
              <td>{route.position}</td>
              <td>{route.colour}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderRoutesTable(this.state.routes)
    );

    return (
      <div>
        <h1 id='tabelLabel'>Routes</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateRoutes() {
    const response = await fetch("api/route");
    const data = await response.json();
    this.setState({ routes: data, loading: false });
  }
}
