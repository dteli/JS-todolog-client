import React from 'react';
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
        <li>Item</li>
        <li>Item</li>
        {logInOut()}
      </ul>
    </nav>
  );
};

export default Navbar;