import { Action } from "redux";

export const GET_PERSON_DETAILS = 'GET_USER_PROFILE';

export interface IGetPersonDetailsAction extends Action {
  type: typeof GET_PERSON_DETAILS,
}

export function GetPersonDetails(): IGetPersonDetailsAction {
  return {
    type: GET_PERSON_DETAILS,
  }
}