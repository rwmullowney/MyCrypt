import React, { Component } from 'react';
import CoinMenu from "./CoinMenu";


const Transactions = props => {
  // debugger;
  console.log(props.cryptos[props.value])
  let obj = props.cryptos[props.value];

  console.log(obj)
  return(
    <div className="transactions">

      {'test'}
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
            value={props.value}
            onCryptoChange={props.onCryptoChange}
            />
          </div>
        </div>

        {/* TODO: Display coin API information here */}

        { console.log(props)}
        { console.log(props.symbol) }

        <div id="coinIcon">{props.cryptos && props.cryptos[props.value] && props.cryptos[props.value].symbol}</div>
        <div id="coinName">{props.cryptos && props.cryptos[props.value] && props.cryptos[props.value].name}</div>
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
}

export default Transactions