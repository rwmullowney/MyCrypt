import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import * as routes from '../constants/routes';
import { auth } from '../firebase';

const SignUpPage = ({ history }) =>
  <div className="container justify-content-center mt-4">
    <h1 className="text-center font-weight-light" >Create Your Account</h1>
    <br />
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(
      // username,
      email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <div className="d-flex justify-content-center">
        <form onSubmit={this.onSubmit}>
          {/* <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Username"
        /> */}
          <input
            className="mx-2 shadow-sm"
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <input
          className="mx-2 shadow-sm"
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <input
          className="mx-2 shadow-sm"
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
          <br />
          <button className="btn btn-primary shadow-sm mt-2" style={{marginLeft: "42%"}} disabled={isInvalid} type="submit">
            Sign Up
        </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

// "Just in case: There is no particular reason why I wrapped the SignUpPage and not the SignUpForm with the higher order component."
export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};