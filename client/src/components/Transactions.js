import React, { Component } from 'react';
import CoinMenu from "./coinmenu";
import API from "../utils/API";

// Removes indentation for unordered list items
var ulStyle = {
  listStyle: 'none',
  paddingLeft: 0
};

var formStyle = {
  marginLeft: "-100px"
}


export default class Transactions extends Component {

  // Set initial state
  state = {
    user: '',
    cryptos: [],
    cryptoValue: 1,
    transactionAmount: 1,
    transactionStatus: '',
    pastBuys: [],
    pastSells: [],
  };

  constructor(props) {
    super(props);
    this.state.user = props.user;
    console.log(props)
  }

  componentDidMount = () => {
    this.cryptoAPI();
    this.pastBuys();
    this.pastSells();
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

  // Grab recent transactions for the signed-in user
  pastBuys = () => {
    API.pastBuys(this.state.user)
      .then(
        res => {
          this.setState({ pastBuys: res.data })
        })
      .catch(err => console.log(err));
  };
  pastSells = () => {
    API.pastSells(this.state.user)
      .then(
        res => {
          this.setState({ pastSells: res.data })
        })
      .catch(err => console.log(err));
  };

  // Send a new transaction to the DB
  postTransaction = (coinAmount, coinSymbol, transactionType) => {
    let date = new Date().toLocaleString()
    console.log(date)

    API.postTransaction(this.state.user, this.state.transactionAmount, transactionType, this.state.cryptoValue, coinAmount, coinSymbol, date)
      .catch(err => console.log(err));;
    console.log(this.state.transactionAmount)
    console.log(this.state.user)
    console.log(this.state.cryptoValue)
    console.log(coinAmount)
    console.log(coinSymbol)
  }


  buyTransaction = e => {
    e.preventDefault();
    console.log(e.target.value)
    let transactionType = 'buy'

    // Puts the state of the wallet in a variable so I can adjust the entire object accordingly before updating the db with it
    let wallet = this.props.wallet;
    let coinSymbol = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].symbol;
    let coinPrice = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price;
    let coinAmount = (this.state.transactionAmount / coinPrice).toFixed(5);

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

      // Updates the user wallet
      API.transaction(this.state.user, wallet)
        // .then(res => console.log(res))
        .catch(err => console.log(err));

      // Updates the state of the wallet
      this.setState({ wallet: wallet, transactionStatus: "Transaction complete!" });

      // Posts the transaction to the database
      this.postTransaction(coinAmount, coinSymbol, transactionType);
    };
  };


  sellTransaction = e => {
    e.preventDefault();
    let transactionType = 'sell'

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

      // Updates the user wallet
      API.transaction(this.state.user, wallet)
        // .then(res => console.log(res))
        .catch(err => console.log(err));

      // Updates the state of the wallet
      this.setState({ wallet: wallet, transactionStatus: "Transaction complete!" });

      // Posts the transaction to the database
      this.postTransaction(coinAmount, coinSymbol, transactionType);
    };
  };

  // Render the most recent 3 customer transactions to the page
  renderBuys = () => {
    console.log(this.state.pastBuys)

    return this.state.pastBuys.map((item) => {
      if (item.transactionType === "buy") {

        return (
          <div>
            <div className="text-left" style={{ width: "200px" }}>
              <p className="m-0">Bought: {item.coinAmount} {item.coinSymbol}</p>
              <p className="m-0">Amount: ${item.transactionAmount.toFixed(2)}</p>
              <p className="m-0">{item.date.toLocaleString()}</p>
            </div>
            <hr align="center" width="40%" />
          </div>
        );
      };
    });
  };
  renderSells = () => {
    console.log(this.state.pastSells)

    return this.state.pastSells.map((item) => {
      if (item.transactionType === "sell") {

        return (
          <div>
            <div className="text-right" style={{ width: "200px" }}>
              <p className="m-0">Sold: {item.coinAmount} {item.coinSymbol}</p>
              <p className="m-0">Amount: ${item.transactionAmount.toFixed(2)}</p>
              <p className="m-0">{item.date}</p>
            </div>
            <hr align="center" width="40%" />
          </div>
        );
      };
    });
  };




  // Conditionally renders the coin menu/information once the crypto API information is loaded
  renderCoinMenu = () => {

    // Defining coin-related variables
    // Builds the URL to display the coin icon on the page
    let coinSymbol = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].symbol.toLowerCase();
    let iconURL = "https://unpkg.com/@icon/cryptocurrency-icons/icons/" + coinSymbol + ".svg";
    // let coinName = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].name;
    let coinPrice = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price;

    if (this.state.cryptos) {
      return (

        <div className="row">
          <div className="mr-1 mt-1" id="coinIcon"><img height="32" width="32" src={iconURL} /></div>
          <div
            style={{ width: "200px" }}>

            <CoinMenu
              cryptos={this.state.cryptos}
              cryptoValue={this.state.cryptoValue}
              onCryptoChange={this.onCryptoChange}
            />
          </div>
          <div className="ml-3 mt-2" id="coinName"><p>Coin value: </p></div>
          <div className="ml-1 mt-2" id="coinPrice"><p>${coinPrice}</p></div>
        </div>

      );
    };
  };


  render() {

    return (
      <div>
        <div className="container text-center shadow-sm rounded border-0 py-2 mt-3" style={{ backgroundColor: "#FBFEFF", width: "40%" }}>
          {/* <p>{JSON.stringify(this.state.cryptos)}</p> */}
          <h4 className="text-center mt-4 font-weight-light">Cash: ${this.props.wallet.cash}</h4>


          <h3 className="mt-3 font-weight-light">Select the currency you'd like to trade:</h3>

          {/* <h5 className="mt-3 mb-0 font-weight-light"><label >Currencies:</label></h5> */}
          <div className="form-group"
            style={{ display: "flex", justifyContent: "center" }}>
            {this.renderCoinMenu()}
          </div>


          <div style={{
            marginLeft: "22px",
          }}>
            <h5 className="mb-0 mt-3 font-weight-light" style={{ marginBottom: "-15px" }}>
              <label className="col-form-label">Amount to trade:</label>
            </h5>
            <div className="container d-flex justify-content-center" style={{ marginTop: "-6px" }}>
              <div className="row">
                <div className="form-group"
                  style={{ display: "flex", justifyContent: "center" }}>
                  <label className="mt-2 mr-1"
                  // style={{position: "absolute", paddingRight: "170px", paddingTop: "2px"}}
                  >$ </label>
                  <input
                    className="form-control shadow-sm"
                    id="transactionAmount"
                    type="number"
                    label="Transaction amount"
                    value={this.state.transactionAmount}
                    onChange={this.onTransactionChange}
                    style={{ width: "200px" }}
                  />
                </div>
                <button className="btn btn-primary ml-3 mr-2 shadow-sm" id="buyTransaction" onClick={this.buyTransaction} style={{ height: "40px", width: "70px" }}>Buy</button>
                <button className="btn btn-danger shadow-sm" id="sellTransaction" onClick={this.sellTransaction} style={{ height: "40px", width: "70px" }}>Sell</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "-8px" }}>
            <p className="mt-0">This amounts to {(this.state.transactionAmount / (this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price)).toFixed(5)} {this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].name}</p>
          </div>

          <div id="transactionStatus">{this.state.transactionStatus}</div>




        </div>
        <hr style={{ marginTop: "40px", marginBottom: "40px" }} width="70%" />
        <div className="container  d-flex  justify-content-center mt-4 shadow-sm rounded border-0 py-2" style={{ backgroundColor: "#FBFEFF", width: "40%" }}>
          <div className="row">
            <div className="col-5">
              <h4 style={{ width: "200px" }} className="text-left">Recent Buys</h4>
              <ul style={ulStyle}>
                {this.renderBuys()}
              </ul>
            </div>
            <div className="col-2"></div>
            <div className="col-5">
              <h4 style={{ width: "200px" }} className="text-right">Recent Sells</h4>
              <ul style={ulStyle}>
                {this.renderSells()}
              </ul>
            </div>
          </div>

        </div >
      </div>

    );
  };
};