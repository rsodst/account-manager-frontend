import { Action } from 'redux';
export const SEND_SIGNUP_REQUEST = 'SEND_SIGNUP_REQUEST';

export default interface ISignUpModel {
  email: string,
  password: string
}

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