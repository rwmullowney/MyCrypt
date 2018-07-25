import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

let textStyle = {
  maxWidth: "50%",
  // color: "#F9F8F8",
  // fontWeight: "lighter"
}

let containerStyle = {
  // backgroundColor: "#F9F8F8",
  // opacity: 0.8,
};

export default class Home extends Component {
  render() {
    return (
      <div className="container mt-4 text-center" style={textStyle}>
        <div className="rounded" style={containerStyle}>
          <br />
          <h2 className="mb-4 font-weight-light">Hey there!  Welcome to MyCrypto.</h2>
          <h3 className="font-weight-light" >We're your digital wallet and cryptocurrency market simulator.</h3>
          <br />
          {/* <hr style={{width: "10%"}}/> */}
          <h4 className="font-weight-light" >If you're interested in cryptocurrency,
          but you're not quite comfortable spending your hard earned cash on it yet, you've come to the right place.</h4>
          <br />
          <h4 className="font-weight-light" >With MyCrypto, you can play the cryptocurrency market with virtual money, risk free.</h4>
          <br />
          <h4 className="font-weight-light" >Sign up now and get $10,000 to experiment with buying and selling from the 10 most popular cryptocurrencies on the market.</h4>
          <br />
          <h4><Link to={routes.SIGN_UP}>Sign Up</Link></h4>
        </div>
      </div>
    )
  }
}