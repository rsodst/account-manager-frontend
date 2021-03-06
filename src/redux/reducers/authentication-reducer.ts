import { Reducer } from 'redux';
import { ActionTypes } from "../actions/action-types";
import { IUserCredential, IResponseErrorModel } from '../../models/authentication';
import { SET_AUTH_LOADING_STATE, SET_USER_CREDENTIAL, SET_AUTH_RESPONSE_ERROR, SET_SIGNOUT } from '../actions/authentication';
import AuthenticationSaga from '../sagas/authentication-saga';
import rootReducer from '../root-reducer';

export interface IAuthenticationState {
  credential: IUserCredential,
  isLoading: boolean,
  responseError: IResponseErrorModel
}

const credential = JSON.parse(localStorage.getItem('credential') ?? "{}");

const initialState: IAuthenticationState = {
  credential: credential,
  isLoading: false,
  responseError: null
};

const AuthenticationReducer: Reducer<IAuthenticationState, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_LOADING_STATE:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_USER_CREDENTIAL:
      localStorage.setItem('credential', JSON.stringify(action.credential));
      return {
        ...state,
        credential: action.credential
      }
    case SET_AUTH_RESPONSE_ERROR:
      return {
        ...state,
        responseError: action.payload
      }
    default: return state;
  }
}

export default AuthenticationReducer;
