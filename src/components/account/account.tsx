import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthenticationLocalStorage from '../authentication/authentication-localstorage';

const Account : React.FC = ()=> {
  var history = useHistory();

  if (!AuthenticationLocalStorage.CheckAuthenticationData())
  {
    history.push('signin');
  }

  return (<div>
    Account component
  </div>);
}

export default Account;