import React, { Component } from 'react';
import API from "../utils/API"


let cardStyle = {
  maxHeight: "200px",
  maxWidth: "300px"
};

let arrowStyle = {
  maxHeight: "18px",
  maxWidth: "18px"
}

let cryptosOwned = [];

// Declare variables for positive & negative arrows
let positiveArrow = `<img className="ml-2" style={arrowStyle} src="/client/public/assets/images/greenArrow.png" alt="A green, upward-facing arrow">`;
let negativeArrow = `<img className="ml-2" style={arrowStyle} src="../../public/assets/images/redArrow.png" alt="A red, downward-facing arrow">`;

export default class Wallet extends Component {

  // Set initial state
  state = {
    user: '',
    wallet: {},
    cryptos: [],
    cryptosOwned: [],
  };

  constructor(props) {
    super(props);
    this.state.user = this.props.user;
    this.state.wallet = this.props.wallet;
    console.log(this.state.wallet)
  };

  componentDidMount = () => {
    this.cryptoAPI();
  };


  cryptoAPI = () => {
    API.search()
      .then(
        res => {
          // Puts initial response (object of objects) into an array so we can check it's length for rendering (similar to users)
          this.setState({ cryptos: res.data.data });
          this.grabUserCoins();
          console.log(this.state.cryptos);
        })
      .catch(err => console.log(err));
  };

  // Grab which coins the user has in their wallet, and convert them to their coin ID
  grabUserCoins = () => {
    let wallet = this.state.wallet;
    for (var coinSymbol in wallet) {

      if (coinSymbol !== "cash") {

        // Convert to coinID based on the symbol of the coin in the wallet
        if (coinSymbol === "BTC") { coinSymbol = 1 }
        else if (coinSymbol === "LTC") { coinSymbol = 2 }
        else if (coinSymbol === "XRP") { coinSymbol = 52 }
        else if (coinSymbol === "XLM") { coinSymbol = 512 }
        else if (coinSymbol === "USDT") { coinSymbol = 825 }
        else if (coinSymbol === "ETH") { coinSymbol = 1027 }
        else if (coinSymbol === "MIOTA") { coinSymbol = 1720 }
        else if (coinSymbol === "EOS") { coinSymbol = 1765 }
        else if (coinSymbol === "BCH") { coinSymbol = 1831 }
        else if (coinSymbol === "ADA") { coinSymbol = 2010 };

        // Send the converted coinID to the array
        cryptosOwned.push(coinSymbol)
      };
    };

    // Set the state to match the cryptos owned array
    this.setState({ cryptosOwned: cryptosOwned });
    console.log(this.state.cryptosOwned)
    // this.renderCards()
  };



  // ==============================================
  // Card Rendering Functions
  // ==============================================

  // Function to determine if the percent change is positive or negative, and assigns the green or red arrow accordingly
  arrowType = (percentChange) => {

    // let arrow = "";
    if (percentChange[0] === "-") {
      // arrow += negativeArrow
      return <img className="ml-2" style={arrowStyle} src={require("../assets/images/redArrow.png")} alt="A red, downward-facing arrow" />
    }
    else {
      // arrow += positiveArrow
      return <img className="ml-2" style={arrowStyle} src={require("../assets/images/greenArrow.png")} alt="A green, upward-facing arrow" />
    }
  }


  renderCards = () => {
    // let coinCards = this.refs.coinCards;
    // coinCards.remove();

    return this.state.cryptosOwned.map((item) => {
      let percentChangeHr = String(this.state.cryptos[item].quotes.USD.percent_change_1h)
      let percentChangeDay = String(this.state.cryptos[item].quotes.USD.percent_change_24h)
      let percentChangeWeek = String(this.state.cryptos[item].quotes.USD.percent_change_7d)

      return (
        <div ref="coinCards">
          <div className="card m-2" style={cardStyle}>
            <div className="card-body" id="${item}">
              <h4 className="font-weight-light">{this.state.cryptos[item].name} - ${this.state.cryptos[item].quotes.USD.price} </h4>
              <hr />
              <h5 className="font-weight-light">Recent performance:</h5>
              <h6 className="font-weight-light">1 Hour: ${this.arrowType(percentChangeHr)} ${percentChangeHr}%
              <br />
                1 Day: ${this.arrowType(percentChangeDay)} ${percentChangeDay}%
              <br />
                1 Week: ${this.arrowType(percentChangeWeek)} ${percentChangeWeek}%</h6>
            </div>
          </div>
        </div>


      )
    })
  }




  render() {
    return (
      <div className="container">
        {/* { this.props.children } */}
        <div className="text-center">
          <h2>Your Wallet</h2>
          <br />
          <h4>Cash: ${this.state.wallet.cash}</h4>
          {/* <p>{this.state.cryptos && this.state.cryptos[512] && this.state.cryptos[512].symbol}</p> */}
        </div>
        <div className="row justify-content-center">
          {this.renderCards()}
        </div>
      </div>
    )
  }
}
