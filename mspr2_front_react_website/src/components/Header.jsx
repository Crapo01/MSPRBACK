import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Image } from 'react-bootstrap';
import authService from '../services/auth.service';

function Header() {

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user)
    }
  }, []);

  function logOut() {
    setCurrentUser(undefined)
    authService.logout();
  }

  return (
    <div >
      <Navbar expand="lg" className={"mb-5 p-3 border rounded bg-dark"}>
        <Navbar.Brand ><Link to={"/"}><Image src="/images/logo_festival.png" alt="logo nation sound" width={"150px"} rounded /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <div className='d-flex justify-content-end flex-column'>
              <div className='d-flex flex-lg-row flex-column ms-auto'>
                <Nav.Link><Link to={"/"} className='font-weight-bolder text-light text-decoration-none h5'>ACCUEIL</Link></Nav.Link>
                <Nav.Link> <Link to={"/Concert"} className='font-weight-bolder text-light text-decoration-none h5'>CONCERTS</Link></Nav.Link>
                <Nav.Link> <Link to={"/Programme"} className='font-weight-bolder text-light text-decoration-none h5'>PROGRAMME</Link></Nav.Link>
                <Nav.Link href="https://nationsoundmetal.rf.gd/wp/partenaires/"><div className='font-weight-bolder text-light text-decoration-none h5'>PARTENAIRES</div></Nav.Link>
                <Nav.Link href="https://nationsoundmetal.rf.gd/wp/foire-aux-questions/"><div className='font-weight-bolder text-light text-decoration-none h5'>FAQ</div></Nav.Link>
                <Nav.Link href="https://nationsoundmetal.rf.gd/wp"><div className='font-weight-bolder text-light text-decoration-none h5'>BOUTIQUE</div></Nav.Link>
              </div>
              <div className='ms-auto'>
                {currentUser ? (
                  <div className="navbar-nav justify-content-end">
                    <li className="nav-item bg-light m-1 rounded">
                      <Link to={"/profile"} className="nav-link">
                        {currentUser.username}
                      </Link>
                    </li>
                    <li className="nav-item bg-light m-1 rounded">
                      <a href="/login" className="nav-link" onClick={logOut}>
                        LogOut
                      </a>
                    </li>
                  </div>
                ) : (
                  <div className="navbar-nav justify-content-end">
                    <li className="nav-item bg-light m-1 rounded">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item bg-light m-1 rounded">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </div>
                )}
              </div>
              

            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Header;