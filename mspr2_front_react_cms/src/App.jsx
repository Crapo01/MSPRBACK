import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardViewer from "./components/board-viewer.component";
import BoardEditor from "./components/board-editor.component";
import BoardAdmin from "./components/board-admin.component";

import "./App.css";
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showViewerBoard: false,
      showEditorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        showViewerBoard:user.roles.includes("ROLE_VIEWER"),
        showEditorBoard: user.roles.includes("ROLE_EDITOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showViewerBoard: false,
      showEditorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showViewerBoard,showEditorBoard, showAdminBoard } = this.state;

    return (
      <div>
              
        <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-between flex-column">
          <div >
          <Link to={"/"} className="navbar-brand">
            NationSound CMS
          </Link>
          </div>
            <div className="navbar-nav justify-content-around">
              <li className="nav-item border">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showViewerBoard && (
                <li className="nav-item border">
                  <Link to={"/viewer"} className="nav-link">
                    Viewer Board
                  </Link>
                </li>
              )}

              {showEditorBoard && (
                <li className="nav-item border">
                  <Link to={"/editor"} className="nav-link">
                    Editor Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item border">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
            </div>
          

          {currentUser ? (
            
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3 maxheight">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/viewer" element={<BoardViewer />} />
            <Route path="/editor" element={<BoardEditor />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
