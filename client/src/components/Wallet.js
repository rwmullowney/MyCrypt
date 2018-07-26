import React, { Component } from 'react';
import API from "../utils/API"
import Background from '../assets/images/background.png';


let cardStyle = {
  maxHeight: "225px",
  maxWidth: "300px"
};
let arrowStyle = {
  maxHeight: "18px",
  maxWidth: "18px"
};
let sectionStyle = {
  width: "100%",
  backgroundImage: `url(${Background})`
};


export default class Wallet extends Component {

  // Set initial state
  state = {
    user: '',
    wallet: {},
    cryptos: [],
    cryptosOwned: [],
    coinAmounts: [],
    netWorth: 0,
  };

  constructor(props) {
    super(props);
    this.state.user = this.props.user;
    this.state.wallet = this.props.wallet;
  };

  componentDidMount = () => {
    this.cryptoAPI();
  };


  // Grabs cryptocurrency information from the API
  cryptoAPI = () => {
    API.search()
      .then(
        res => {
          // Puts initial response (object of objects) into an array so we can check it's length for rendering (similar to users)
          this.setState({ cryptos: res.data.data });
          this.grabUserCoins();
          this.netWorth();
          console.log(this.state.cryptos);
        })
      .catch(err => console.log(err));
  };

  // Grab which coins the user has in their wallet, and convert them to their coin ID
  grabUserCoins = () => {

    // Reset the cryptosOwned array so it doesn't stack on each additional component load
    let cryptosOwned = [];
    let coinAmounts = [];

    let wallet = this.state.wallet;
    for (var coinSymbol in wallet) {
      if (coinSymbol !== "cash") {

        // Push the amount owned to a separate array, with the same index associating the amount here with the ID in cryptosOwned[]
        coinAmounts.push(wallet[coinSymbol])

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
    this.setState({ cryptosOwned: cryptosOwned, coinAmounts: coinAmounts });
    console.log(this.state.cryptosOwned)
    console.log(this.state.coinAmounts)
    // this.renderCards()
  };

  // Calculate the user's net worth
  netWorth = () => {

    // Set base netWorth as the user's cash amount
    let netWorth = Number(this.state.wallet.cash);

    // Adds the value of the user's coins
    for (let i = 0; i < this.state.cryptosOwned.length; i++) {
      netWorth += (this.state.cryptos[this.state.cryptosOwned[i]].quotes.USD.price * this.state.coinAmounts[i]);
    };

    this.setState({ netWorth: netWorth.toFixed(2) })
  };



  // ==============================================
  // Card Rendering Functions
  // ==============================================

  // Function to determine if the percent change is positive or negative, and assigns the green or red arrow accordingly
  arrowType = (percentChange) => {
    if (percentChange[0] === "-") {
      return <img className="ml-2" style={arrowStyle} src={require("../assets/images/redArrow.png")} alt="A red, downward-facing arrow" />
    }
    else {
      return <img className="ml-2" style={arrowStyle} src={require("../assets/images/greenArrow.png")} alt="A green, upward-facing arrow" />
    };
  };


  // Generates the cards and renders them on the page
  renderCards = () => {

    return this.state.cryptosOwned.map((item) => {
      let percentChangeHr = String(this.state.cryptos[item].quotes.USD.percent_change_1h);
      let percentChangeDay = String(this.state.cryptos[item].quotes.USD.percent_change_24h);
      let percentChangeWeek = String(this.state.cryptos[item].quotes.USD.percent_change_7d);

      return (
        <div>
          <div className="card m-2 shadow-sm" style={cardStyle}>
            <div className="card-body" id="${item}">
              <h4 className="font-weight-light">{this.state.cryptos[item].symbol} - ${this.state.cryptos[item].quotes.USD.price.toFixed(2)} </h4>
              <h5 className="font-weight-light">Owned: {this.state.wallet[this.state.cryptos[item].symbol]}</h5>
              <hr />
              <h5 className="font-weight-light">Recent performance:</h5>
              <h6 className="font-weight-light">1 Hour: {this.arrowType(percentChangeHr)} {percentChangeHr}%
              <br />
                1 Day: {this.arrowType(percentChangeDay)} {percentChangeDay}%
              <br />
                1 Week: {this.arrowType(percentChangeWeek)} {percentChangeWeek}%</h6>
            </div>
          </div>
        </div>
      );
    });
  };


  render() {
    return (
      < div className="container" >
        <div className="mt-4 text-center">
          <h2 className="font-weight-light">Your Wallet</h2>

          <hr style={{width: "50%", align: "center"}} />

          <h3 className="font-weight-light">Net Worth: ${this.state.netWorth}</h3>
          <h4 className="font-weight-light">Cash: ${this.state.wallet.cash}</h4>
          <h4 className="mt-4 font-weight-light"><u>Coins Owned</u></h4>

        </div>
        <div className="row justify-content-center" id='coinCards'>
          {this.renderCards()}
        </div>
      </div >
    );
  };
};