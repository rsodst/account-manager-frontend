import { Action } from "redux";

export const SET_PERSON_DETAILS = 'SET_PERSON_DETAILS';

export interface IPersonDetails
{
  id : string,
  firstName : string,
  lastName : string,
  middleName : string
}

export interface ISetPersonDetailsAction extends Action {
  type: typeof SET_PERSON_DETAILS,
  personDetails : IPersonDetails
}

export function SetPersonDetails(personDetails : IPersonDetails): ISetPersonDetailsAction {
  return {
    type: SET_PERSON_DETAILS,
    personDetails
  }
}