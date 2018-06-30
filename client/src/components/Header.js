import React, { Component } from 'react';
import Transactions from "./Transactions"
import API from "../utils/API";


// Defines variable for use as CSS
var textStyle = {
  fontFamily: "Georgia"
};



export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      cryptos: [],
      value: 52
    }
  }
  // Set initial state
  // state = {
  //   cryptos: [],
  //   value: 52
  // };

  // Runs the API query upon page load
  componentDidMount() {
    this.cryptoAPI();
  };

  // grabDB(req, res){
  //   db.User.findAll({})
  //   .then(dbModel => res.json(dbModel))
  // }

  loadUsers = () => {
    API.getUsers()
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };



  // Runs the CoinMarketCap API and updates the state with the response
  cryptoAPI() {
    API.search()
      .then(
        res => this.setState({ cryptos: res.data.data })
      )
      .catch(err => console.log(err));
  };

  // Update the crypto on the page
  onCryptoChange = e => {
    console.log("updating with " + e.target.value)
    this.setState({ value: e.target.value })
    // console.log(this.state.cryptos[this.state.value])
  }






  render() {

    // { console.log(this.state.cryptos) }
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