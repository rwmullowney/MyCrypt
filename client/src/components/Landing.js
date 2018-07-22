import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="container mt-5 text-center">
        {/* TODO: Why doesn't the font-weight work? */}
        <div>
          <br />
          <h2 className="font-weight-light">Hey there!  Welcome to MyCrypto - we're your digital wallet and market monitor.</h2>
          <br />
          {/* <hr style={{width: "10%"}}/> */}
          <h4 className="font-weight-light">Interested in cryptocurrency but don't want to risk gambling with real money?</h4>
          <br />
          <h4 className="font-weight-light">Try this site risk free! Invest with "$10,000" and select from the top 10 list of crypto stocks.</h4>
          <br />
          <h4 className="font-weight-light">Click Transactions and begin investing now!</h4>
        </div>
      </div>
    )
  }
}