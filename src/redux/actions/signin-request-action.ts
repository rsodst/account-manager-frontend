import { Action } from 'redux';
export const SEND_SIGNIN_REQUEST = 'SEND_SIGNIN_REQUEST';

export default interface ISignInModel {
  email: string,
  password: string
}

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