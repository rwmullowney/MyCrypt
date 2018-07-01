import React, { Component } from 'react';
import Transactions from "./Transactions"
import API from "../utils/API";

// Defines variable for use as CSS
var textStyle = {
  fontFamily: "Georgia"
};

export default class Header extends Component {

  // Set initial state
  state = {
    cryptos: [],
    value: 52
  };


  // Runs the API query upon page load
  componentDidMount() {
    this.cryptoAPI();
  };


  // Runs the CoinMarketCap API and updates the state with the response
  cryptoAPI() {
    API.search()
      .then(
        // res => this.setState({ cryptos: res.data.data })
        res => {
          let cryptoArray = []
          for (let i in res.data.data) {
            cryptoArray.push(res.data.data[i])
          }
          this.setState({ cryptos: cryptoArray });
        }
      )
      .catch(err => console.log(err));
  };

// Update the crypto on the page
  onCryptoChange = e => {
    console.log(this.state.cryptos)
    console.log("the length is: " + this.state.cryptos.length)
    // for (let i = 0; i < this.state.cryptos.length; i++){

    // }
    // e.preventDefault();
    console.log("updating with " + e.target.value)
    this.setState({value: e.target.value})
  }






  render() {

    {console.log(this.state.cryptos)}
    return (
      
      <div className="container justify-content-center mt-3 header">
        <h1 className="text-center" style={textStyle}>Crypto Transactions</h1>

        <hr />

        {/* {this.props.children} */}
        <Transactions
          cryptos={this.state.cryptos}
          value={this.state.value}
          onCryptoChange={this.onCryptoChange}
        />
      </div>
    )
  }
}