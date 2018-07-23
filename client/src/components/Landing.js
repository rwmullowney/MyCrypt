import React, { Component } from 'react';

var textStyle = {
  maxWidth: "50%"
}

export default class Home extends Component {
  render() {
    return (
      <div className="container mt-4 text-center" style={textStyle}>
        <br />
        <h2 className="font-weight-light">
          Hey there!  Welcome to MyCrypto.

        </h2>
        <h3 className="font-weight-light">We're your digital wallet and market monitor.</h3>
        <br />
        {/* <hr style={{width: "10%"}}/> */}
        <h4 className="font-weight-light">If you're interested in cryptocurrency,
          but you're not quite comfortable spending your hard earned cash on it yet, you've come to the right place.</h4>
        <br />
        <h4 className="font-weight-light">With MyCrypto, you can play the cryptocurrency market with virtual money, risk free.</h4>
        <br />
        <h4 className="font-weight-light">Sign up now and get $10,000 to experiment with buying and selling from the top 10 list of cryptocurrencies on the market.</h4>
      </div>
    )
  }
}