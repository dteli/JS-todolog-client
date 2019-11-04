import React from 'react';
//import { Route, Link, Switch } from 'react-router-dom';
import './Navbar.scss';

const Navbar = (props) => {


  const resetToken = () => {
    props.updateToken(undefined);
    props.setLoggedIn(false);
    localStorage.clear('token');
  }

  const logInOut = () => props.loggedIn ?
    <li onClick={resetToken}>Logout</li> :
    null;

  return (
    <nav id="navbar">
      <p>logo</p>
      <span id="navspacer"></span>
      <ul>
        <li>Home</li>
        <li>Account Info</li>
        {logInOut()}
      </ul>
    </nav>
  );
};

export default Navbar;