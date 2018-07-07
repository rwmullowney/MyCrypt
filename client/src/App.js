import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
 } from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './Account';

import * as routes from './routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  render() {
    return (
  <Router>
    <div>
     <Navigation authUser={this.state.authUser} />

    <hr/>

<Route
  exact path={routes.LANDING}
  component={() => <LandingPage />}
/>
<Route
  exact path={routes.SIGN_UP}
  component={() => <SignUpPage />}
/>
<Route
  exact path={routes.SIGN_IN}
  component={() => <SignInPage />}
/>
<Route
  exact path={routes.PASSWORD_FORGET}
  component={() => <PasswordForgetPage />}
/>
<Route
  exact path={routes.HOME}
  component={() => <HomePage />}
/>
<Route
  exact path={routes.ACCOUNT}
  component={() => <AccountPage />}
/>
</div>
  </Router>
    );
  }
}

export default App;


