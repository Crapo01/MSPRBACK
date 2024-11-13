import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <article>
          <h1> NATIONSOUND CONTENT MANAGEMENT SYSTEM </h1>
          <p>User's must be logged in to access securised content:</p>
          <p>Viewers is the default role while signed up.They have limited read rights only</p>
          <p>Editors have read/write/modify/delete rights for concerts,actu and pointeurs content only</p>
          <p>Admins have read/write/modify/delete rights for users accounts fields only</p>
        </article>
      </div>
    );
  }
}
