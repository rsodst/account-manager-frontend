
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { IAppState } from '../redux/root-reducer';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import AuthenticationLayout from '../components/authentication/authentication-layout';
import SignInForm from '../components/authentication/signin-form';
import SignUpForm from '../components/authentication/signup-form';
import { history } from '../redux/store';
import React from 'react';
import AccountPage from '../components/private/private-page';
import { IUserCredential } from '../redux/actions/user-credential-action';
import ProfileEditorDrawer from '../components/private/profile-editor-drawer';

interface IAppRouterProps {
  credential: IUserCredential
}

const AppRouter: React.FC<IAppRouterProps> = (props) => {
  return (
    <Router history={history}>
      <Switch>
        {
          props.credential && props.credential.isAuthenticated ? (
            <Fragment>
              <Route exact path="/account">
                <AccountPage></AccountPage>
              </Route>
            </Fragment>
          )
            : (
              <Fragment>
                <Redirect exact from="/" to="/signin"></Redirect>
                <Route exact path="/signin">
                  <AuthenticationLayout>
                    <SignInForm></SignInForm>
                  </AuthenticationLayout>
                </Route>
                <Route exact path="/signup" >
                  <AuthenticationLayout>
                    <SignUpForm></SignUpForm>
                  </AuthenticationLayout>
                </Route>
              </Fragment>
            )
        }
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state: IAppState): IAppRouterProps => ({
  credential: state.authentication.credential
});

export default connect(mapStateToProps)(AppRouter);