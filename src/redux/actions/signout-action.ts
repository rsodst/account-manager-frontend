import { Action } from "redux";

export const SET_SIGNOUT = 'SET_SIGNOUT';

export interface ISetSignOutStateAction extends Action {
  type: typeof SET_SIGNOUT
}

export function SetSignOutState(): ISetSignOutStateAction {
  return {
    type: SET_SIGNOUT
  }
}