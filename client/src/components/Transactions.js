import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import CoinMenu from "./coinmenu";
import API from "../utils/API";


import Background from '../components/img/background.png';


export default class Transactions extends Component {



  // Set initial state
  state = {
    user: '',
    cryptos: [],
    cryptoValue: 1,
    transactionAmount: 1,
    transactionStatus: '',
    pastTransactions: [],
  };

  constructor(props) {
    super(props);
    this.state.user = props.user;
    console.log(props)
  }

  componentDidMount = () => {
    this.cryptoAPI();
    this.pastTransactions();
  };
  // ==============================================
  // onChange Functions
  // ==============================================

  // Update the crypto on the page
  onCryptoChange = e => {
    console.log("updating with " + e.target.value);
    this.setState({ cryptoValue: e.target.value });
  }

  //   // Updates state when user changes purchase amount
  onTransactionChange = e => {
    this.setState({ transactionAmount: e.target.value })
  }



  // ==============================================
  // API/DB Functions
  // ==============================================

  cryptoAPI = () => {
    API.search()
      .then(
        res => {
          // Puts initial response (object of objects) into an array so we can check it's length for rendering (similar to users)
          this.setState({ cryptos: res.data.data })
        })
      .catch(err => console.log(err));
  };

  // Grab all transactions for the signed-in user
  pastTransactions = () => {
    API.pastTransactions(this.state.user)
      .then(
        res => {
          console.log(res.data)
          this.setState({ pastTransactions: res.data })
        })
      .catch(err => console.log(err));
  };

  // Send a new transaction to the DB
  postTransaction = () => {
    // API.postTransaction(this.state)
    console.log(this.state)
  }


  buyTransaction = e => {
    e.preventDefault();

    // Puts the state of the wallet in a variable so I can adjust the entire object accordingly before updating the db with it
    let wallet = this.props.wallet;
    let coinSymbol = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].symbol;
    let coinPrice = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price;
    let coinAmount = (this.state.transactionAmount / coinPrice).toFixed(5);
    console.log(wallet.cash)
    console.log(this.state.transactionAmount)
    console.log(coinAmount)

    // Checks if the user can afford the transaction
    if (Number(this.state.transactionAmount) > wallet.cash) {
      this.setState({ transactionStatus: "You cannot afford this transaction!" });
    }

    // Allows the transaction if the user can afford it
    else {
      wallet.cash -= Number(this.state.transactionAmount);
      wallet.cash = wallet.cash.toFixed(2);

      // Checks to see if the coin is in the user's wallet (i.e. not undefined).  If not it sets the coin amount to the transactionAmount.  Otherwise, it adds it.
      if (!wallet[coinSymbol]) {
        wallet[coinSymbol] = Number(coinAmount);
      }
      else { wallet[coinSymbol] += Number(coinAmount) };

      console.log("Buying...")
      console.log(wallet)
      API.transaction(this.state.user, wallet)
        // .then(res => console.log(res))
        .catch(err => console.log(err));

      // Updates the state of the wallet
      this.setState({ wallet: wallet, transactionStatus: "Transaction complete!" });
    }
  }


  sellTransaction = e => {
    e.preventDefault();
    console.log("selling")

    // Puts the state of the wallet in a variable so I can adjust the entire object accordingly before updating the db with it
    let wallet = this.props.wallet;
    let coinSymbol = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].symbol;
    let coinPrice = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price;
    let coinAmount = (this.state.transactionAmount / coinPrice).toFixed(5);


    // Checks if the user has enough of a given coin to perform the transaction
    if (!wallet[coinSymbol] || (coinAmount) > wallet[coinSymbol]) {
      this.setState({ transactionStatus: "You don't have that many coins to sell!" });
    }
    else {
      wallet.cash = Number(wallet.cash)
      wallet.cash += Number(this.state.transactionAmount);
      wallet.cash = wallet.cash.toFixed(2);

      wallet[coinSymbol] = Number(wallet[coinSymbol] - coinAmount).toFixed(5);
      console.log(wallet.cash)
      console.log(wallet[coinSymbol])

      // A transaction resulted in BTC showing as null in the wallet so I'm hoping this works around that 
      // (it allowed me to sell 0.24447 when there was only 0.2444 or something to that effect)
      if (wallet[coinSymbol] === 0 || wallet[coinSymbol] === null) {
        delete wallet[coinSymbol];
      }

      console.log("Selling...")
      console.log(wallet)

      API.transaction(this.state.user, wallet)
        // .then(res => console.log(res))
        .catch(err => console.log(err));

      // Updates the state of the wallet
      this.setState({ wallet: wallet, transactionStatus: "Transaction complete!" });
    };

  };


  renderTransactions = () => {
    return this.state.pastTransactions.map((item) => {
      return (

        <div>
          <p className="m-0">Purchased: {item.coinAmount} {item.coin}</p>
          <p className="m-0">Cost: ${item.purchasePrice}</p>
          <p className="m-0">Date: {item.date}</p>
          <hr align="left" width="40%" />
        </div>
      )
    })
  }




  // Conditionally renders the coin menu/information once the crypto API information is loaded
  renderCoinMenu = () => {

    // Defining coin-related variables
    // Builds the URL to display the coin icon on the page
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


  render() {
  


    return (
      
      <div className="container">
        <p className="text-center">Signed in as: {this.state.user}</p>
        {/* <p>{JSON.stringify(this.state.cryptos)}</p> */}
        <p className="text-center">Cash: ${this.props.wallet.cash}</p>


        <h3 className="mt-3">Select the currency you'd like to buy:</h3>
        <div className="col-3">
          <div className="form-group">
            <label >Currencies:</label>
            {this.renderCoinMenu()}
          </div>
        </div>

        <div className="form-group">
          <label className="col-2 col-form-label">Amount to trade:</label>
          <div className="col-3">
            <input
              className="form-control"
              id="transactionAmount"
              type="number"
              label="Transaction amount"
              value={this.state.transactionAmount}
              onChange={this.onTransactionChange}
            />
            <p>This amounts to {(this.state.transactionAmount / (this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price)).toFixed(5)} {this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].name}</p>
          </div>
        </div>

        <br />
        {/* Display whether transaction was successful (I think?) */}
        <div id="transactionStatus">{this.state.transactionStatus}</div>

        <button className="btn btn-primary" id="buyTransaction" onClick={this.buyTransaction}>Buy</button>
        <button className="btn btn-danger" id="sellTransaction" onClick={this.sellTransaction}>Sell</button>

        <hr />

        <h4>Transactions</h4>
        {this.renderTransactions()}


      </div>


    );
  };
};