import React, { Component } from 'react';
import API from "../utils/API"

let cryptosOwned = [];

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
  }

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
      }
      
    };
    this.setState({cryptosOwned: cryptosOwned});
    console.log(this.state.cryptosOwned)
  };




  render() {
    return (
      <div className="container">
        {/* { this.props.children } */}
        <h3>Wallet</h3>
        <p>{this.state.wallet.cash}</p>
        <p>{this.state.cryptos && this.state.cryptos[512] && this.state.cryptos[512].symbol}</p>
        <div className="cardArea"></div>
      </div>
    )
  }
}
