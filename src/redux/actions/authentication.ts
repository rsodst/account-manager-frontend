import { Action } from "redux";
import { IResponseErrorModel, IUserCredential, ISignUpModel, ISignInModel, IChangePassword } from '../../models/authentication';

export const SET_AUTH_LOADING_STATE = 'SET_AUTH_LOADING_STATE';

export interface ISetAuthLoadingStateAction extends Action {
  type: typeof SET_AUTH_LOADING_STATE
  isLoading: boolean
}

export function SetAuthLoadingState(state: boolean): ISetAuthLoadingStateAction {
  return {
    type: SET_AUTH_LOADING_STATE,
    isLoading: state
  }
}

export const SET_AUTH_RESPONSE_ERROR = 'SET_AUTH_RESPONSE_ERROR'

export interface ISetAuthResponseErrorAction extends Action {
  type: typeof SET_AUTH_RESPONSE_ERROR
  payload: IResponseErrorModel
}

export function SetAuthResponseError(model: IResponseErrorModel): ISetAuthResponseErrorAction {
  return {
    type: SET_AUTH_RESPONSE_ERROR,
    payload: model
  }
}

export const SEND_SIGNIN_REQUEST = 'SEND_SIGNIN_REQUEST';

export interface ISignInRequestAction extends Action {
  type: typeof SEND_SIGNIN_REQUEST
  payload: ISignInModel
}

export function SignInRequest(model: ISignInModel): ISignInRequestAction {
  return {
    type: SEND_SIGNIN_REQUEST,
    payload: model
  }
}

export const SET_SIGNOUT = 'SET_SIGNOUT';

export interface ISetSignOutStateAction extends Action {
  type: typeof SET_SIGNOUT
}

export function SetSignOutState(): ISetSignOutStateAction {
  return {
    type: SET_SIGNOUT
  }
}

export const SEND_SIGNUP_REQUEST = 'SEND_SIGNUP_REQUEST';

export interface ISignUpRequestAction extends Action {
  type: typeof SEND_SIGNUP_REQUEST
  payload: ISignUpModel
}

export function SignUpRequest(model: ISignUpModel): ISignUpRequestAction {
  return {
    type: SEND_SIGNUP_REQUEST,
    payload: model
  }
}

export const SET_USER_CREDENTIAL = 'SET_USER_CREDENTIAL';

export interface ISetUserCredentialAction extends Action {
  type: typeof SET_USER_CREDENTIAL
  credential: IUserCredential
}

export function SetUserCredential(model: IUserCredential): ISetUserCredentialAction {
  return {
    type: SET_USER_CREDENTIAL,
    credential: model
  }
}

export const SET_USER_EMAIL = 'SET_USER_EMAIL';

export interface ISetUserEmailAction extends Action {
  type: typeof SET_USER_EMAIL
  email: string
}

export function SetUserEmail(email : string): ISetUserEmailAction {
  return {
    type: SET_USER_EMAIL,
    email
  }
}

export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';

export interface ISetUserPasswordAction extends Action {
  type: typeof SET_USER_PASSWORD
  password: IChangePassword
}

export function SetUserPassword(password : IChangePassword): ISetUserPasswordAction {
  return {
    type: SET_USER_PASSWORD,
    password
  }
}

export const DELETE_USER = 'DELETE_USER';

export interface IDeleteUserAction extends Action {
  type: typeof DELETE_USER
}

export function DeleteUser(): IDeleteUserAction {
  return {
    type: DELETE_USER,
  }
}