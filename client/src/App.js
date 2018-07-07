import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import * as routes from './constants/routes';
import { firebase } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }))
        console.log(this.state.authUser.email)
        ;
    });
  }
  
  render() {
    return (
      <Router>
        <div>
          <Header authUser={this.state.authUser} />

          <hr />

          <Route
            exact path={routes.LANDING}
            component={() => <Landing />}
          />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUp />}
          />
          <Route
            exact path={routes.SIGN_IN}
            component={() => <SignIn />}
          />

          {/* Not in use yet */}
          {/* <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          /> */}
          {/* Not in use yet - Where the user is redirected after signing up/in*/}
          {/* <Route
            exact path={routes.HOME}
            component={() => <HomePage />}
          /> */}
          {/* Not in use yet */}
          {/* <Route
            exact path={routes.ACCOUNT}
            component={() => <AccountPage />}
          /> */}
        </div>
      </Router>
    );
  };
};

export default App;