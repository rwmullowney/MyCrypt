import React, { Component } from 'react';
import Transactions from "./Transactions"
import API from "../utils/API";

// Defines variable for use as CSS
var textStyle = {
  fontFamily: "Georgia"
};

var testarray = {data:[1, 2, 3, 4, 5]}

export default class Header extends Component {

  // Set initial state
  state = {
    cryptos: [],
    value: 52,
    users: []
  };

  // Runs the API query upon page load
  componentDidMount() {
    this.cryptoAPI();
    this.loadUsers();
  };

  // Grab the user list from the database
  loadUsers = () => {
    API.getUsers()
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  };

  // Runs the CoinMarketCap API and updates the state with the response
  cryptoAPI() {
    API.search()
      .then(
        res => { 
          // Puts initial response (object of objects) into an array so we can check it's length for rendering (similar to users)
          this.setState({ cryptos: [res.data.data] }) 
        }
      )
      .catch(err => console.log(err));
  };

  // Update the crypto on the page
  onCryptoChange = e => {
    console.log("updating with " + e.target.value)
    this.setState({ value: e.target.value })
    // console.log(this.state.cryptos[this.state.value])
  }

  renderTransactions() {

    // Makes it so Transactions isn't rendered unless the user data is actually there.  So, basically, "Transactions" was 
    // rendering twice - once before the users were loaded and once afterwards.  However, when we'd try to call for specific  
    // properties of an object (and because of the timing of the user data being grabbed), it was trying to grab the property   
    // from the empty array.  So now, this makes it so that we won't even run that initial empty-array Transactions rendering 
    // because the if statement here ensures that it won't render unless there's an item in the array
    if (this.state.users.length && this.state.cryptos) {
      console.log(this.state.cryptos)
      return (<Transactions
        cryptos={this.state.cryptos[0]}
        value={this.state.value}
        onCryptoChange={this.onCryptoChange}
        users={this.state.users}
      />)
    }
  }




  render() {

    // { console.log(this.state.cryptos) }
    return (

      <div className="container justify-content-center mt-3 header">
        <h1 className="text-center" style={textStyle}>Crypto Transactions</h1>

        <hr />

        {this.renderTransactions()}

      </div>
    )
  }
}