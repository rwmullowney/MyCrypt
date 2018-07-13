import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import CoinMenu from "./coinmenu";
import API from "../utils/API";


var BackgroundImage = React.createClass({
  componentWillMount:function(){
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    
    this.setState({x:x,y:y});
  },
  render:function(){
    return (<div><img className='bg' src={'https://source.unsplash.com/'+this.state.x+'x'+this.state.y+'/?nature'} /></div>)
  }  
});

ReactDOM.render(
  <BackgroundImage/>,
  document.getElementById('app')
);

export default class Transactions extends Component {





  // Set initial state
  state = {
    user: '',
    cryptos: [],
    cryptoValue: 1,
    transactionAmount: 1,
    transactionStatus: ''
  };

  constructor(props) {
    super(props);
    this.state.user = props.user;
    console.log(props)
  }

  componentDidMount = () => {
    this.cryptoAPI();
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

  cryptoAPI() {
    API.search()
      .then(
        res => {
          // Puts initial response (object of objects) into an array so we can check it's length for rendering (similar to users)
          this.setState({ cryptos: res.data.data })
        }
      )
      .catch(err => console.log(err));
  };

  buyTransaction = e => {
    e.preventDefault();

    // Puts the state of the wallet in a variable so I can adjust the entire object accordingly before updating the db with it
    let wallet = this.props.wallet;
    let coinSymbol = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].symbol;
    let coinPrice = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price;
    let coinAmount = (this.state.transactionAmount / coinPrice).toFixed(5);
    console.log(wallet.cash)
    console.log(this.state.transactionAmount)
    console.log(coinAmount)

    // Checks if the user can afford the transaction
    if (Number(this.state.transactionAmount) > wallet.cash) {
      this.setState({ transactionStatus: "You cannot afford this transaction!" });
    }

    // Allows the transaction if the user can afford it
    else {
      wallet.cash -= Number(this.state.transactionAmount);

      // Checks to see if the coin is in the user's wallet (i.e. not undefined).  If not it sets the coin amount to the transactionAmount.  Otherwise, it adds it.
      if (!wallet[coinSymbol]) {
        wallet[coinSymbol] = coinAmount;
      }
      else { wallet[coinSymbol] += coinAmount };

      API.transaction(this.state.user, wallet)
        // .then(res => console.log(res))
        .catch(err => console.log(err));

      // Updates the state of the wallet
      this.setState({ wallet: wallet, transactionStatus: "Transaction complete!" });
    }
  }


  sellTransaction = e => {
    e.preventDefault();
    console.log("selling")

    // Puts the state of the wallet in a variable so I can adjust the entire object accordingly before updating the db with it
    let wallet = this.props.wallet;
    let coinSymbol = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].symbol;
    let coinPrice = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price;
    let coinAmount = (this.state.transactionAmount / coinPrice).toFixed(5);


    // Checks if the user has enough of a given coin to perform the transaction
    if ((coinAmount) > wallet[coinSymbol]) {
      this.setState({ transactionStatus: "You don't have that many coins to sell!" });
    }
    else {
      wallet.cash += Number(this.state.transactionAmount);
      wallet[coinSymbol] -= coinAmount;

      // A transaction resulted in BTC showing as null in the wallet so I'm hoping this works around that 
      // (it allowed me to sell 0.24447 when there was only 0.2444 or something to that effect)
      if (wallet[coinSymbol] === 0 || wallet[coinSymbol] === null) {
        delete wallet[coinSymbol];
      }

      API.transaction(this.state.user, wallet)
        // .then(res => console.log(res))
        .catch(err => console.log(err));

      // Updates the state of the wallet
      this.setState({ wallet: wallet, transactionStatus: "Transaction complete!" });
    };

  };




  // Conditionally renders the coin menu/information once the crypto API information is loaded
  renderCoinMenu = () => {
    // Defining coin-related variables
    // Builds the URL to display the coin icon on the page
    let coinSymbol = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].symbol.toLowerCase();
    let iconURL = "https://unpkg.com/@icon/cryptocurrency-icons/icons/" + coinSymbol + ".svg";
    let coinName = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].name;
    let coinPrice = this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price;

    if (this.state.cryptos) {
      return (
        <div>
          <CoinMenu
            cryptos={this.state.cryptos}
            cryptoValue={this.state.cryptoValue}
            onCryptoChange={this.onCryptoChange}
          />
          <div className="mt-3">
            <div id="coinIcon"><img height="32" width="32" src={iconURL} /></div>
            <div id="coinName">Name: {coinName}</div>
            <div id="coinPrice">${coinPrice}</div>
          </div>
        </div>
      );
    };
  };


  render() {

    return (

      <div className="container">
        <p className="text-center">Signed in as: {this.state.user}</p>
        {/* <p>{JSON.stringify(this.state.cryptos)}</p> */}
        <p className="text-center">Cash: ${this.props.wallet.cash}</p>


        <h3 className="mt-3">Select the currency you'd like to buy:</h3>
        <div className="col-3">
          <div className="form-group">
            <label >Currencies:</label>
            {this.renderCoinMenu()}
          </div>
        </div>

        <div className="form-group">
          <label className="col-2 col-form-label">Amount to trade:</label>
          <div className="col-3">
            <input
              className="form-control"
              id="transactionAmount"
              type="number"
              label="Transaction amount"
              value={this.state.transactionAmount}
              onChange={this.onTransactionChange}
            />
            <p>This amounts to {(this.state.transactionAmount / (this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].quotes.USD.price)).toFixed(5)} {this.state.cryptos && this.state.cryptos[this.state.cryptoValue] && this.state.cryptos[this.state.cryptoValue].name}</p>
          </div>
        </div>

        <br />
        {/* Display whether transaction was successful (I think?) */}
        <div id="transactionStatus">{this.state.transactionStatus}</div>

        <button className="btn btn-primary" id="buyTransaction" onClick={this.buyTransaction}>Buy</button>
        <button className="btn btn-danger" id="sellTransaction" onClick={this.sellTransaction}>Sell</button>

        
      </div>


    );
  }
}




const pastTransactions = props => {
  // debugger;
  // console.log(props.cryptos)

  // let userWallet = JSON.parse(props.signedIn.userWallet);
  // console.log(props.userWallet)


  return (
    <div className="transactions">

      {/* {console.log(props)} */}
      {/* Tests that we can grab user data from the database */}
      <br />
      {/* https://stackoverflow.com/questions/17159295/accessing-object-with-key-as-number-php */}
      {/* {props.users[0].wallet.cash} */}
      {/* {console.log(props.cryptos[props.value])} */}

      {/* <div className="container"> */}
      {/* {{!-- Sign in as a select user email --}} */}
      {/* <div className="form-group">
          <label className="col-2 col-form-label">User ID Login</label>
          <div className="col-10">
            <input
              className="form-control"
              id="loginEmail"
              type="email"
              label="Email address"
              placeholder="Enter email"
              value={props.loginEmail}
              onChange={props.onLoginChange}
            />
          </div>
        </div>
        <div id="showLogin"></div>
        <button className="btn btn-success" id="userLogin" onClick={props.userLogin}>Login</button> */}



      <h6>Signed in as:</h6>
      {/* <p>Username: {props.signedIn.userName}</p>
        <p>Email: {props.signedIn.userEmail}</p>
        <p>Wallet cash: {props.userWallet.cash}</p> */}


      {/* Create a new user */}
      {/* <div className="form-group">
          <label className="col-2 col-form-label">Create Account</label>
          <div className="col-10">
            <input
              className="form-control"
              id="createEmail"
              type="email"
              label="Email address"
              placeholder="Enter email"
              // value={props.createEmail}
              // onChange={props.onEmailChange}
            />
          </div>
        </div>
        <button className="btn btn-success" id="submitEmail" onClick={props.createUser}>Create user</button> */}


      {/* {console.log(props)}
        {console.log(props.symbol)} */}


      {/* <div id="coinIcon"><img height="32" width="32" src={iconURL} /></div>
        <div id="coinName">{coinName}</div>
        <div id="coinPrice">${coinPrice}</div> */}

      <div className="form-group">
        <label className="col-2 col-form-label">Amount to trade:</label>
        <div className="col-10">
          <input
            className="form-control"
            id="transactionAmount"
            type="number"
            label="Transaction amount"
          // value={props.transactionAmount}
          // onChange={props.onTransactionChange}
          />
          {/* <p>This amounts to {(props.transactionAmount / coinPrice).toFixed(5)} {coinName}</p> */}
        </div>
      </div>

      <button className="btn btn-primary" id="buyTransaction" onClick={props.buyTransaction}>Buy</button>
      <button className="btn btn-danger" id="sellTransaction" onClick={props.sellTransaction}>Sell</button>

      <br />
      {/* Display whether transaction was successful (I think?) */}
      <div id="transactionStatus">{props.transactionStatus}</div>


      <hr />

      <h3>This user's transactions:</h3>
      <div id="userTransacations"></div>
      <br />

      <h3>Your wallet:</h3>
      <div id="userCoins"></div>

    </div>
    // </div >
  )
}

// export default Transactions