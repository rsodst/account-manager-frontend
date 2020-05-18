import { Action } from 'redux';
export const SET_USER_CREDENTIAL = 'SET_USER_CREDENTIAL';

export interface IUserCredential {
  email: string
  userId: string
  accessToken: string
  issuedDate: string
  isAuthenticated:boolean
}

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