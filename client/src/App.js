import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import * as routes from './constants/routes';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Header />

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
          </div>
        </Router>
    );
  };
};

export default App;