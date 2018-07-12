import React, { Component } from 'react';
import API from "../utils/API"

let cryptosOwned = [];

export default class Wallet extends Component {

  // Set initial state
  state = {
    user: '',
    wallet: {},
    cryptos: []
  };

  constructor(props) {
    super(props);
    this.state.user = this.props.user;
    this.state.wallet = this.props.wallet;
  }

  componentDidMount = () => {
    this.cryptoAPI();
    this.grabUserCoins();
  };


  cryptoAPI = () => {
    API.search()
      .then(
        res => {
          // Puts initial response (object of objects) into an array so we can check it's length for rendering (similar to users)
          this.setState({ cryptos: res.data.data });
          console.log(this.state.cryptos);
        })
      .catch(err => console.log(err));
  };

  grabUserCoins = () => {
    let wallet = this.state.wallet;
    for (var item in wallet) {
      if (item !== "cash") cryptosOwned.push(item);
    };
    console.log(cryptosOwned);
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
