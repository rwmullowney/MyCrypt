import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      wallet: {},
      // cryptos: []
    };
  }


  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }))
      // console.log(this.state.authUser.email)
        ;
      // Signs the user into their game account upon logging into Firebase
      this.userLogin();
    });
  }


  // https://github.com/facebook/react/issues/5591
  // https://github.com/facebook/react/issues/5591
  // https://github.com/facebook/react/issues/5591
  // cryptoAPI = () => {
  //   API.search()
  //     .then(
  //       res => {
  //         // Puts initial response (object of objects) into an array so we can check it's length for rendering (similar to users)
  //         this.setState({ cryptos: res.data.data })
  //       }
  //     )
  //     .catch(err => console.log(err));
  // };


  // Sees if the signed in user has an account in the DB and if not, creates the user
  userLogin = () => {
    API.userLogin(this.state.authUser.email)
      .then(res => {
        console.log("signing in");
        // console.log(res.data);
        if (res.data === null) {
          console.log("account not found");
          this.createUser();
        }
        else {
          this.setState({ wallet: res.data.wallet })
        }
      })
      .catch(err => console.log(err))
  };

<<<<<<< HEAD
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


=======
  // renderTransactions() {
  //   if(this.state.authUser){
  //     console.log("Signed in now")
  //     console.log(this.state.authUser.email)
  //     return (<Transactions user={this.state.authUser.email} />)

  //   }
  // }


>>>>>>> emit


  render() {
    return (
      <Router>
        <div>
          <Header authUser={this.state.authUser} />

          <hr />

          <Route
            exact path={routes.HOME}
            component={() => <Home />}
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