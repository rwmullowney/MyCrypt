import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';
import * as routes from '../routes';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
        const { onSetAuthUser } = this.props;

        firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? onSetAuthUser(authUser)
          : onSetAuthUser(null);
        });
      }
    constructor(props) {
        super(props);
  
        this.state = {
          authUser: null,
        };
      }
  
      componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
          authUser
            ? this.setState(() => ({ authUser }))
            : this.setState(() => ({ authUser: null }));
        });
      }

    render() {
      return this.props.authUser ? <Component /> : null;
    }
  }
  
  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

  return compose(
    withRouter,
    connect(mapStateToProps),
  )(WithAuthorization);
}
  
  export default withAuthorization;