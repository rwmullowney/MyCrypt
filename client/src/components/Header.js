import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';




// Defines variable for use as CSS
var textStyle = {
  fontFamily: "Georgia"
};

// CSS to remove the bullet of the <ul> tags
var removeListBullet = {
  listStyleType: 'none'
};

var rootStyle = {
  backgroundColor : 'black',
  color : 'white',
  height : '100vh' 
}

// Dummy wallet for populating newly created users with currency




const Header = ({ authUser }) =>
  <div className="container justify-content-center mt-3 header">
    <h1 className="text-center" style={textStyle}>My Crypto</h1>

    <hr />
    <div>
      {authUser
        ? <HeaderAuth />
        : <HeaderNonAuth />
      }
    </div>
  </div>


// Determine what links to show depending on whether the user is signed in
const HeaderAuth = () =>
  <ul>
    <div className="row justify-content-center">
      <li className="mx-5" style={removeListBullet}><Link to={routes.HOME}>Home</Link></li>
      <li className="mx-5" style={removeListBullet}><Link to={routes.LANDING}>Landing</Link></li>
      <li className="mx-5" style={removeListBullet}><Link to={routes.ACCOUNT}>Account</Link></li>
      <li className="mx-5" style={removeListBullet}><Link to={routes.TRANSACTIONS}>Transactions</Link></li>
      <li className="mx-5" style={removeListBullet}><Link to={routes.WALLET}>Wallet</Link></li>
      <li className="mx-5" style={removeListBullet}><SignOutButton /></li>
    </div>
  </ul>

const HeaderNonAuth = () =>
  <ul>
    <div className="row justify-content-center">
      <li className="mx-5" style={removeListBullet}><Link to={routes.LANDING}>Landing</Link></li>
      <li className="mx-5" style={removeListBullet}><Link to={routes.SIGN_IN}>Sign In</Link></li>
    </div>
  </ul>

export default Header;

// export default class Header extends Component {

//   // Set initial state
//   state = {
//     cryptos: [],
//     cryptoValue: 52,
//     createEmail: 'Enter your email to create your account',
//     loginEmail: "Enter your email to sign in here",
//     users: [],
//     signedIn: {},
//     userWallet: {},
//     transactionAmount: 1,
//     transactionStatus: ''
//   };


//   // Runs the API queries upon page load
//   componentDidMount() {
//     this.cryptoAPI();
//     this.loadUsers();
//   };


//   // ==============================================
//   // onChange Functions
//   // ==============================================

//   // Update the crypto on the page
//   onCryptoChange = e => {
//     console.log("updating with " + e.target.value)
//     this.setState({ cryptoValue: e.target.value })
//   }

//   // Updates state when the email the user enters to create an account is changed
//   onEmailChange = e => {
//     this.setState({ createEmail: e.target.value })
//   }

//   // Updates state when the email the user enters to sign in is changed
//   onLoginChange = e => {
//     this.setState({ loginEmail: e.target.value })
//   }

//   // Updates state when user changes purchase amount
//   onTransactionChange = e => {
//     this.setState({ transactionAmount: e.target.value })
//   }


//   // ==============================================
//   // API/DB Functions
//   // ==============================================

//   // Runs the CoinMarketCap API and updates the state with the response
//   cryptoAPI() {
//     API.search()
//       .then(
//         res => {
//           // Puts initial response (object of objects) into an array so we can check it's length for rendering (similar to users)
//           this.setState({ cryptos: [res.data.data] })
//         }
//       )
//       .catch(err => console.log(err));
//   };

//   // Grab the user list from the database
//   loadUsers = () => {
//     API.getUsers()
//       .then(res => {
//         console.log(res.data)
//         this.setState({ users: res.data })
//       })

//       .catch(err => console.log(err));
//   };

//   // Sends user email to the DB to create a basic account
//   createUser = e => {
//     e.preventDefault();
//     API.createUser({
//       userName: "test user",
//       userEmail: this.state.createEmail,
//       wallet: testWallet
//     })
//       .then(res => this.loadUsers)
//       .catch(err => console.log(err));
//   }

//   // "Signs in" with the email address a user inputs
//   userLogin = e => {
//     e.preventDefault();
//     API.userLogin(this.state.loginEmail)
//       .then(res => {
//         console.log("signed in")
//         console.log(res.data)
//         this.setState({
//           signedIn: {
//             userName: res.data.userName,
//             userEmail: res.data.userEmail,
//           },
//           userWallet: res.data.wallet
//         })
//       })
//       .catch(err => console.log(err))
//   }

//   // Sends purchase to DB and updates user wallet
//   // TODO: can I make buy and sell methods of an overarching transaction function?
//   buyTransaction = e => {
//     e.preventDefault();

//     // Puts the state of the wallet in a variable so I can adjust the entire object accordingly before updating the db with it
//     let wallet = this.state.userWallet;
//     let coinSymbol = this.state.cryptos[0][this.state.cryptoValue].symbol;
//     let coinPrice = this.state.cryptos[0][this.state.cryptoValue].quotes.USD.price;
//     let coinAmount = this.state.transactionAmount / coinPrice;

//     // Checks if the user can afford the transaction
//     if (this.state.transactionAmount > wallet.cash) {
//       this.setState({ transactionStatus: "You cannot afford this transaction!" });
//     }

//     // Allows the transaction if the user can afford it
//     else {
//       wallet.cash -= Number(this.state.transactionAmount);

//       // Checks to see if the coin is in the user's wallet (i.e. not undefined).  If not it sets the coin amount to the transactionAmount.  Otherwise, it adds it.
//       if (!wallet[coinSymbol]) {
//         wallet[coinSymbol] = Number(coinAmount)
//       }
//       else { wallet[coinSymbol] += Number(coinAmount) };

//       API.transaction(this.state.loginEmail, wallet)
//         // .then(res => console.log(res))
//         .catch(err => console.log(err));

//       // Updates the state of the wallet
//       this.setState({ userWallet: wallet, transactionStatus: "Transaction complete!" });
//     }
//   }


//   sellTransaction = e => {
//     e.preventDefault();
//     console.log("selling")

//     // Puts the state of the wallet in a variable so I can adjust the entire object accordingly before updating the db with it
//     let wallet = this.state.userWallet;
//     let coinSymbol = this.state.cryptos[0][this.state.cryptoValue].symbol;
//     let coinPrice = this.state.cryptos[0][this.state.cryptoValue].quotes.USD.price;
//     let coinAmount = this.state.transactionAmount / coinPrice;

//     // Checks if the user can afford the transaction
//     if ((coinAmount) > wallet[coinSymbol]) {
//       this.setState({ transactionStatus: "You don't have that many coins to sell!" });
//     }
//     else {
//       wallet.cash += Number(this.state.transactionAmount);
//       wallet[coinSymbol] -= Number(coinAmount);

//       if (wallet[coinSymbol] === 0) {
//         delete wallet[coinSymbol];
//       }

//       // TODO: Check if coinSymbol amount hits zero and remove it from wallet if so
//       // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete

//       API.transaction(this.state.loginEmail, wallet)
//         // .then(res => console.log(res))
//         .catch(err => console.log(err));

//       // Updates the state of the wallet
//       this.setState({ userWallet: wallet, transactionStatus: "Transaction complete!" });
//     };
//   };


//   renderTransactions() {

//     // Makes it so Transactions isn't rendered unless the user data is actually there.  So, basically, "Transactions" was 
//     // rendering twice - once before the users were loaded and once afterwards.  However, when we'd try to call for specific  
//     // properties of an object (and because of the timing of the user data being grabbed), it was trying to grab the property   
//     // from the empty array.  So now, this makes it so that we won't even run that initial empty-array Transactions rendering 
//     // because the if statement here ensures that it won't render unless there's an item in the array
//     if (this.state.users.length && this.state.cryptos) {
//       return (<Transactions
//         cryptos={this.state.cryptos[0]}
//         cryptoValue={this.state.cryptoValue}
//         onCryptoChange={this.onCryptoChange}

//         createEmail={this.state.createEmail}
//         onEmailChange={this.onEmailChange}
//         createUser={this.createUser}

//         loginEmail={this.state.loginEmail}
//         onLoginChange={this.onLoginChange}
//         userLogin={this.userLogin}
//         signedIn={this.state.signedIn}
//         userWallet={this.state.userWallet}

//         onTransactionChange={this.onTransactionChange}
//         buyTransaction={this.buyTransaction}
//         sellTransaction={this.sellTransaction}
//         transactionAmount={this.state.transactionAmount}
//         transactionStatus={this.state.transactionStatus}

//         users={this.state.users}
//       />)
//     }
//   }




//   render() {

//     // { console.log(this.state.cryptos) }
//     return (

//       <div className="container justify-content-center mt-3 header">
//         <h1 className="text-center" style={textStyle}>Crypto Transactions</h1>

//         <hr />

//         <div>
//           <div>
//             {authUser
//               ? <HeaderAuth />
//               : <HeaderNonAuth />
//             }
//           </div>
//         </div>


//         {/* {this.renderTransactions()} */}

//       </div>
//     )
//   }
// }

