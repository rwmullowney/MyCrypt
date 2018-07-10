import React, { Component } from 'react';
import CoinMenu from "./CoinMenu";
import API from "../utils/API"



// Defining coin-related variables
// Builds the URL to display the coin icon on the page







export default class Transactions extends Component {


  // Defining coin-related variables
  // Builds the URL to display the coin icon on the page


  // Set initial state
  state = {
    user: '',
    cryptos: [],
    cryptoValue: 1,
    // createEmail: 'Enter your email to create your account',
    // loginEmail: "Enter your email to sign in here",
    // users: [],
    // signedIn: {},
    // userWallet: {},
    // transactionAmount: 1,
    // transactionStatus: ''
  };




  constructor(props) {
    super(props);
    this.state.user = props.user;
    console.log(props)
  }

  componentDidMount = () => {
    this.cryptoAPI();
  };

  // ==============================================
  // onChange Functions
  // ==============================================

  // Update the crypto on the page
  onCryptoChange = e => {
    console.log("updating with " + e.target.value);
    this.setState({ cryptoValue: e.target.value });
  }

  // Conditionally renders the coin menu/information once the crypto API information is loaded
  renderCoinMenu = () => {
    let coinSymbol = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].symbol.toLowerCase();
    let iconURL = "https://unpkg.com/@icon/cryptocurrency-icons/icons/" + coinSymbol + ".svg";
    let coinName = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].name;
    let coinPrice = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price;

    if (this.state.cryptos) {
      return (
        <div>
          <CoinMenu
            cryptos={this.state.cryptos}
            cryptoValue={this.state.cryptoValue}
            onCryptoChange={this.onCryptoChange}
          />
          <div className="mt-3">
            <div id="coinIcon"><img height="32" width="32" src={iconURL} /></div>
            <div id="coinName">Name: {coinName}</div>
            <div id="coinPrice">${coinPrice}</div>
          </div>
        </div>
      );
    };
  };


  cryptoAPI() {
    API.search()
      .then(
        res => {
          // Puts initial response (object of objects) into an array so we can check it's length for rendering (similar to users)
          this.setState({ cryptos: res.data.data })
        }
      )
      .catch(err => console.log(err));
  };


  render() {

    return (

      <div className="container">
        <p className="text-center">Signed in as: {this.state.user}</p>
        {/* <p>{JSON.stringify(this.state.cryptos)}</p> */}
        <p></p>


        <h3 className="mt-3">Select the currency you'd like to buy:</h3>
        <div className="col-6">
          <div className="form-group">
            <label >Currencies:</label>
            {this.renderCoinMenu()}
          </div>
        </div>

      </div>





    );
  }
}





















const pastTransactions = props => {
  // debugger;
  // console.log(props.cryptos)

  // let userWallet = JSON.parse(props.signedIn.userWallet);
  // console.log(props.userWallet)


  return (
    <div className="transactions">

      {/* {console.log(props)} */}
      {/* Tests that we can grab user data from the database */}
      <br />
      {/* https://stackoverflow.com/questions/17159295/accessing-object-with-key-as-number-php */}
      {/* {props.users[0].wallet.cash} */}
      {/* {console.log(props.cryptos[props.value])} */}

      {/* <div className="container"> */}
      {/* {{!-- Sign in as a select user email --}} */}
      {/* <div className="form-group">
          <label className="col-2 col-form-label">User ID Login</label>
          <div className="col-10">
            <input
              className="form-control"
              id="loginEmail"
              type="email"
              label="Email address"
              placeholder="Enter email"
              value={props.loginEmail}
              onChange={props.onLoginChange}
            />
          </div>
        </div>
        <div id="showLogin"></div>
        <button className="btn btn-success" id="userLogin" onClick={props.userLogin}>Login</button> */}



      <h6>Signed in as:</h6>
      {/* <p>Username: {props.signedIn.userName}</p>
        <p>Email: {props.signedIn.userEmail}</p>
        <p>Wallet cash: {props.userWallet.cash}</p> */}


      {/* Create a new user */}
      {/* <div className="form-group">
          <label className="col-2 col-form-label">Create Account</label>
          <div className="col-10">
            <input
              className="form-control"
              id="createEmail"
              type="email"
              label="Email address"
              placeholder="Enter email"
              // value={props.createEmail}
              // onChange={props.onEmailChange}
            />
          </div>
        </div>
        <button className="btn btn-success" id="submitEmail" onClick={props.createUser}>Create user</button> */}


      {/* {console.log(props)}
        {console.log(props.symbol)} */}


      {/* <div id="coinIcon"><img height="32" width="32" src={iconURL} /></div>
        <div id="coinName">{coinName}</div>
        <div id="coinPrice">${coinPrice}</div> */}

      <div className="form-group">
        <label className="col-2 col-form-label">Amount to trade:</label>
        <div className="col-10">
          <input
            className="form-control"
            id="transactionAmount"
            type="number"
            label="Transaction amount"
          // value={props.transactionAmount}
          // onChange={props.onTransactionChange}
          />
          {/* <p>This amounts to {(props.transactionAmount / coinPrice).toFixed(5)} {coinName}</p> */}
        </div>
      </div>

      <button className="btn btn-primary" id="buyTransaction" onClick={props.buyTransaction}>Buy</button>
      <button className="btn btn-danger" id="sellTransaction" onClick={props.sellTransaction}>Sell</button>

      <br />
      {/* Display whether transaction was successful (I think?) */}
      <div id="transactionStatus">{props.transactionStatus}</div>


      <hr />

      <h3>This user's transactions:</h3>
      <div id="userTransacations"></div>
      <br />

      <h3>Your wallet:</h3>
      <div id="userCoins"></div>

    </div>
    // </div >
  )
}

// export default Transactions