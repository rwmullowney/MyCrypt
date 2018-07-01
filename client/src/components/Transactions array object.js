import React, { Component } from 'react';


class CoinMenu extends Component {

  render() {

    console.log("this props props");
    console.log(this.props.props.cryptos[0]);
    return (
      <div>
        {JSON.stringify(this.props.props.cryptos[3])}
        <select
          value={this.props.props.value}
          onChange={this.props.props.onCryptoChange}
          className="form-control" id="coinDropdown">
          <option value="1">Bitcoin</option>
          <option value="2">Litecoin</option>
          <option value="52">Ripple</option>
          <option value="512">Stellar</option>
          <option value="1027">Ethereum</option>
          <option value="1720">IOTA</option>
          <option value="1765">EOS</option>
          <option value="1831">Bitcoin Cash</option>
          <option value="1958">TRON</option>
          <option value="2010">Cardano</option>
        </select>
      </div>
    );
  };
};





const Transactions = props => (
  <div className="transactions">

    {/* {console.log("props cryptos")}
    {console.log(props.cryptos)} */}

    {/* {console.log("in transactions:")}
    {console.log(props.cryptos[52])} */}
    {/* {JSON.stringify(props.cryptos[52])} */}
    {props.cryptos.length > 0 ? props.cryptos[0].symbol : null}

    <div className="container">
      {/* {{!-- Sign in as a select userID --}} */}
      <div className="form-group">
        <label className="col-2 col-form-label">User ID Login</label>
        <div className="col-10">
          <input className="form-control" type="email" value="1" id="loginID" />
        </div>
      </div>
      <div id="showLogin"></div>
      <button className="btn btn-success" id="userLogin">Login</button>


      {/* Create a new user */}
      <div className="form-group">
        <label className="col-2 col-form-label">User Email</label>
        <div className="col-10">
          <input className="form-control" type="email" value="bootstrap@example.com" id="userEmail" />
        </div>
      </div>
      <button className="btn btn-success" id="submitEmail">Create user</button>




      {/* Can I just have this read the currnt value of the select form
      and then display other stuff based on that current value? */}
      <h2 className="mt-3">Select the currency you'd like to buy:</h2>
      <div className="col-6">
        <div className="form-group">
          <label >Currencies:</label>
          <CoinMenu

            // Passing these in here too because for some reason I can't access the props properties without
            // them being undefined otherwise.  Probably an async issue.
            props={props}
          />
        </div>
      </div>

      {/* TODO: Display coin API information here */}
      <div id="coinIcon">{JSON.stringify(props.cryptos[props.value])}</div>
      <div id="coinName"></div>
      <div id="coinPrice"></div>

      <div className="form-group">
        <label className="col-2 col-form-label">Amount to trade:</label>
        <div className="col-10">
          <input className="form-control" type="number" value="1" id="coinAmount" />
        </div>
      </div>

      <button className="btn btn-primary" id="buyTransaction">Buy</button>
      <button className="btn btn-danger" id="sellTransaction">Sell</button>

      <br />
      {/* Display whether transaction was successful (I think?) */}
      <div id="transactionStatus"></div>


      <hr />

      <h3>This user's transactions:</h3>
      <div id="userTransacations"></div>
      <br />

      <h3>Your wallet:</h3>
      <div id="userCoins"></div>

    </div>
  </div>
)

export default Transactions