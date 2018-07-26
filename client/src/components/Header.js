import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import SignInForm from './SignIn';
import * as routes from '../constants/routes';


// potential header colors:
// #F8E9CD

// Defines variable for use as CSS
var textStyle = {
  fontFamily: "Georgia",
  float: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#FEFBF7"
};

// CSS to remove the bullet of the <ul> tags
var removeListBullet = {
  listStyleType: 'none',
  display: "inline",
};

var headerStyle = {
  position: "relative",
  overflow: "hidden",
  maxHeight: "75px",
}

var headerColor = {
  backgroundColor: "#434141",
  // backgroundColor: "#FBF2E2"
};


const Header = ({ authUser }) =>
<<<<<<< HEAD
<div className="shadow-sm" style={headerColor}>
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
=======
  <div className="container justify-content-center mt-3 header">
    <h1 className="text-center" style={textStyle}>My Crypto</h1>

    <hr />
    <div>
      {authUser
        ? <HeaderAuth />
        : <HeaderNonAuth />
      }
>>>>>>> refs/remotes/origin/master
    </div>
    {/* <hr className="mt-0" /> */}
  </div>
</div>

// Determine what links to show depending on whether the user is signed in
const HeaderAuth = () =>
  <ul style={removeListBullet}>
    <div className="row">
      <li className="mx-3"><Link style={{color: "#EAEBEE"}} to={routes.TRANSACTIONS}>Transactions</Link></li>
      <li className="mx-3"><Link style={{color: "#EAEBEE"}} to={routes.WALLET}>Wallet</Link></li>
      <li className="mx-3"><SignOutButton /></li>
    </div>
  </ul>

const HeaderNonAuth = () =>
  <ul style={removeListBullet}>
    <div className="row">
      {/* <li className="mx-3"><Link to={routes.SIGN_IN}>Sign In</Link></li> */}
      <li className="mx-3"><SignInForm 
      // history={history}
       /></li>
    </div>
  </ul>

export default Header;