import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import ActuAdmin from "./editor-actu";
import ConcertAdmin from "./editor-concert";
import PointeurAdmin from "./editor-pointeur";
import { StompSessionProvider} from "react-stomp-hooks";
import Notifications from "./notification";




export default class BoardEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getModeratorBoard().then(
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
      }
    );
  }

  

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <StompSessionProvider
          url={'http://localhost:8080/ws-endpoint'}>                    
        <ActuAdmin/>
        <ConcertAdmin/>
        <PointeurAdmin/>
        </StompSessionProvider>
      </div>
    );
  }
}
