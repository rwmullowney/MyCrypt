import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';
import * as routes from '../routes';

export default withAuthorization;

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {

    componentDidMount() {
        const { onSetAuthUser } = this.props;

        firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? onSetAuthUser(authUser)
          : onSetAuthUser (null);
        });
      }
    constructor(props) {
        super(props);
  
        this.state = {
          authUser: null,
        };
      }

    render() {
      return this.props.authUser ? <Component /> : null;
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

return connect(null, mapDispatchToProps)(WithAuthorization);}