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
        {/* { this.props.children } */}
      </div>
      </div>
      </div>
    )
  }
}