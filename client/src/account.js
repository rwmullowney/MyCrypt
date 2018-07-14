import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

// Defines variable for use as CSS
var textStyle = {
    fontFamily: "Georgia"
  };
  
  // CSS to remove the bullet of the <ul> tags
  var removeListBullet = {
    listStyleType: 'none'
  };
  
  // Dummy wallet for populating newly created users with currency
  
  
  
  
  const Header = ({ authUser }) =>
    <div className="container justify-content-center mt-3 header">
      <h1 className="text-center" style={textStyle}>My Crypto</h1>
  
      <hr />
      <div>
        {authUser
          ? <HeaderAuth />
          : <HeaderNonAuth />
        }
      </div>
    </div>
  
  
  // Determine what links to show depending on whether the user is signed in
  const HeaderAuth = () =>
    <ul>
      <div className="row justify-content-center">
        <li className="mx-5" style={removeListBullet}><Link to={routes.HOME}>Home</Link></li>
        <li className="mx-5" style={removeListBullet}><Link to={routes.LANDING}>Landing</Link></li>
        <li className="mx-5" style={removeListBullet}><Link to={routes.ACCOUNT}>Account</Link></li>
        <li className="mx-5" style={removeListBullet}><Link to={routes.TRANSACTIONS}>Transactions</Link></li>
        <li className="mx-5" style={removeListBullet}><Link to={routes.WALLET}>Wallet</Link></li>
        <li className="mx-5" style={removeListBullet}><SignOutButton /></li>
      </div>
    </ul>
  
  const HeaderNonAuth = () =>
    <ul>
      <div className="row justify-content-center">
        <li className="mx-5" style={removeListBullet}><Link to={routes.LANDING}>Landing</Link></li>
        <li className="mx-5" style={removeListBullet}><Link to={routes.SIGN_IN}>Sign In</Link></li>
      </div>
    </ul>
  
  export default Header;

  export default class Landing extends Component {

    render() {
  
  
      return (
        <div className="landing">
        <h1>Landing page</h1>
          {/* { this.props.children } */}
        </div>
      )
    }
  }