import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';




// Defines variable for use as CSS
var textStyle = {
  fontFamily: "Georgia",
  float: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

// CSS to remove the bullet of the <ul> tags
var removeListBullet = {
  listStyleType: 'none',
  display: "inline",
};

var headerStyle = {
  position: "relative",
  overflow: "hidden",
  maxHeight: "75px"
}


const Header = ({ authUser }) =>
  <div className="container" >
    <div style={headerStyle}>
      <div className="mt-1">

        <h1 style={textStyle}>MyCrypto</h1>

        <div className="float-right">
          {authUser
            ? <HeaderAuth />
            : <HeaderNonAuth />
          }
        </div>
      </div>
    </div>
    <hr className="mt-0" />
  </div>


// Determine what links to show depending on whether the user is signed in
const HeaderAuth = () =>
  <ul style={removeListBullet}>
    <div className="row">
      <li className="mx-3"><Link to={routes.HOME}>Home</Link></li>
      <li className="mx-3"><Link to={routes.TRANSACTIONS}>Transactions</Link></li>
      <li className="mx-3"><Link to={routes.WALLET}>Wallet</Link></li>
      <li className="mx-3"><SignOutButton /></li>
    </div>
  </ul>

const HeaderNonAuth = () =>
  <ul style={removeListBullet}>
    <div className="row">
      <li className="mx-3"><Link to={routes.SIGN_IN}>Sign In</Link></li>
    </div>
  </ul>

export default Header;