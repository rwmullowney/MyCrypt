import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Transactions from './components/Transactions';
import Wallet from "./components/Wallet";

import API from "./utils/API"

import * as routes from './constants/routes';
import { firebase } from './firebase';

let newWallet = {
  cash: 10000
};

let redirect = ''

let backgroundStyle = {
  backgroundColor: "#EEF2F7",
  position: "absolute", top: 0, bottom: 0, left: 0, right: 0
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      wallet: {},
      // cryptos: []
    };
  };


  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? (
          this.setState(() => ({ authUser })),
          redirect = routes.WALLET
        )
        : (this.setState(() => ({ authUser: null })),
          redirect = routes.HOME
        )
        // console.log(this.state.authUser.email)
        ;
      // Signs the user into their game account upon logging into Firebase
      this.userLogin();
      console.log(redirect)
    });
  };


  // Sees if the signed in user has an account in the DB and if not, creates the user
  userLogin = () => {
    API.userLogin(this.state.authUser.email)
      .then(res => {
        console.log("signing in");
        // console.log(res.data);
        if (res.data === null) {
          console.log("account not found");
          this.createUser();

          // Re-log the user in after creating their account
          this.userLogin();
        }
        else {
          this.setState({ wallet: res.data.wallet })
        };
      })
      .catch(err => console.log(err))
  };

  // Creates a new user in the database
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


  // Renders the transactions page only if a user is signed in
  renderTransactions() {
    if (this.state.authUser) {
      // console.log("Signed in now")
      // console.log(this.state.authUser.email)
      // this.cryptoAPI()
      return (<Transactions user={this.state.authUser.email} wallet={this.state.wallet} />)
    }
    else {
      return (
        <div className="container">
          <p className="text-center">You must be signed in to view this page!</p>
        </div>
      )
    }
  }


  renderWallet() {
    if (this.state.authUser) {
      // console.log("Signed in now")
      // console.log(this.state.authUser.email)
      // this.cryptoAPI()
      return (<Wallet user={this.state.authUser.email} wallet={this.state.wallet} />)
    }
    else {
      return (
        <div className="container">
          <p className="text-center">You must be signed in to view this page!</p>
        </div>
      )
    }
  }


  // {authUser
  //   ? <HeaderAuth />
  //   : <HeaderNonAuth />
  // }



  render() {

    return (
      <Router>
        <div style={backgroundStyle}>
          <Header authUser={this.state.authUser} />
          {/* <Route
            exact path={routes.LANDING}
            component={() => <Home />}
          /> */}
          <Route
            exact path={routes.HOME}
            component={() => <Home />}
          />
          <Route
            exact path={"/"} render={() =>
              this.state.authUser
                ? <Redirect to={routes.WALLET} />
                : <Redirect to={routes.HOME} />
            }
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
          <Route
            exact path={routes.WALLET}
            component={() =>
              this.renderWallet()
            }
          />

          {/* Not in use yet */}
          {/* <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          /> */}
          {/* Not in use yet - Where the user is redirected after signing up/in*/}

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