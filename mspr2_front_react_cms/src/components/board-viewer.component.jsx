import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import ActuViewer from "./viewer-actu";
import PointeurViewer from "./viewer-pointeur";
import ConcertViewer from "./viewer-concert";
import authService from "../services/auth.service";
import RedirectToLogin from "./redirect-to-login";


export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    

    this.state = {
      content: "",
      redir: false,
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
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
          this.setState({
            redir: true
          });
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>               
        {this.state.redir&&<RedirectToLogin/>}        
        <ActuViewer/>
        <ConcertViewer/>
        <PointeurViewer/>
      </div>
    );
  }
}
