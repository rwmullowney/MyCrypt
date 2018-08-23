import React, { Component } from 'react';

class CoinMenu extends Component {


  render() {

    return (
        <select
          value={this.props.cryptoValue}
          onChange={this.props.onCryptoChange}
          className="form-control shadow-sm" id="coinDropdown"
          >
          <option value="1">Bitcoin</option>
          <option value="2">Litecoin</option>
          <option value="52">Ripple</option>
          <option value="512">Stellar</option>
          <option value="825">Tether</option>
          <option value="1027">Ethereum</option>
          <option value="1720">IOTA</option>
          <option value="1765">EOS</option>
          <option value="1831">Bitcoin Cash</option>
          <option value="2010">Cardano</option>
        </select>
    );
  };
};

export default CoinMenu