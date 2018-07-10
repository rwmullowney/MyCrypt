import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Transactions from './components/Transactions';

import API from "./utils/API"

import * as routes from './constants/routes';
import { firebase } from './firebase';

let newWallet = {
  cash: 10000
}

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
        this.userLogin();
    }
  );
  }

  userLogin = () => {
    API.userLogin(this.state.authUser.email)
      .then(res => {
        console.log("signing in");
        console.log(res.data);
        if(res.data === null){
          console.log("account not found");
          this.createUser();
        };
      })
      .catch(err => console.log(err))
  };

    createUser = () => {
      console.log("creating account")
    API.createUser({
      userName: "test user",
      userEmail: this.state.authUser.email,
      wallet: newWallet
    })
      .then(res => this.loadUsers)
      .catch(err => console.log(err));
  }


  renderTransactions() {
    if (this.state.authUser) {
      // console.log("Signed in now")
      // console.log(this.state.authUser.email)
      return (<Transactions user={this.state.authUser.email} />)
    }
    else {
      return (
        <div className="container">
          <p className="text-center">You must be signed in to view this page!</p>
        </div>
      )
    }
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
          <Route
            exact path={routes.TRANSACTIONS}
            component={() =>
              this.renderTransactions()
            }
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