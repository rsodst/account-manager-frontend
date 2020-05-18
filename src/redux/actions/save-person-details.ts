import { Action } from "redux";

export const SAVE_PERSON_DETAILS = 'SAVE_PERSON_DETAILS';

export interface ISavePersonDetailsAction extends Action {
  type: typeof SAVE_PERSON_DETAILS,
  isUpdate:boolean
}

export function SavePersonDetails(isUpdate : boolean): ISavePersonDetailsAction {
  return {
    type: SAVE_PERSON_DETAILS,
    isUpdate : isUpdate
  }
}