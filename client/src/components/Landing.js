import React, { Component } from 'react';
import Background from '../components/img/cryptocurrency.jpg';

var styles = {
  color:'violet',
  backgroundImage: 'url('+Background+')'
  };

  var rootStyle = {
    backgroundColor : 'black',
    color : 'white',
    height : '100vh' 
  }

export default class Landing extends Component {
  render() {
    return (
      <div style={rootStyle}>
      <div className="landing">
      <div className="col-0">
      <h2>Welcome to MyCrypto! Your digital wallet and monitor</h2>
      <h4>Interested in cryptocurrency but don't want to risk gambling with real money?</h4>
      <h4>Then try this site risk free! Invest with "$10,000" and select from the top 10 list of crypto stocks.</h4>

      <p>Click Transactions and begin investing now!</p>
        {/* { this.props.children } */}
      </div>
      </div>
      </div>
    )
  }
}