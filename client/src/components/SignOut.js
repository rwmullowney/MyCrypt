import React from 'react';
import { auth } from '../firebase';

let buttonStyle = {
  // color: "#D30225",
  border: 0,
  padding: 0,

};

const SignOutButton = () =>
  <button className="btn btn-outline-danger"
    style={buttonStyle}
    type="button"
    // className="btn btn-danger"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button >

export default SignOutButton;