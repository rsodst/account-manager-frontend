import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// Authnetication
import AuthenticationLayout from './components/authentication/authentication-layout';
import SignInForm from './components/authentication/signin-form';
import SignUpForm from './components/authentication/signup-form';

const AppRouter : React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin">
          <AuthenticationLayout>
            <SignInForm></SignInForm>
          </AuthenticationLayout>
        </Route>
        <Route exact path="/signup">
          <AuthenticationLayout>
            <SignUpForm></SignUpForm>
          </AuthenticationLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;