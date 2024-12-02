import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import UserAdmin from "./admin-users";
import RedirectToLogin from "./redirect-to-login";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      redir: false,
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");         
        }

        this.setState({
          redir: true
        });
        
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <UserAdmin/>
          {this.state.redir&&<RedirectToLogin/>} 
        </header>
      </div>
    );
  }
}
