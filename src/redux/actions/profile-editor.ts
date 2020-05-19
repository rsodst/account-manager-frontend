import { Action } from "redux";
import { IPersonDetails, IProfileResponseErrorModel } from "../../models/profile-editor";

export const SET_PROFILE_EDITOR_VISIBILITY = 'SET_PROFILE_EDITOR_VISIBILITY';

export interface ISetProfileEditorVisibilityAction extends Action {
  type: typeof SET_PROFILE_EDITOR_VISIBILITY
  visibility : boolean
}

export function SetProfileEditorVisibilityAction(visibility : boolean): ISetProfileEditorVisibilityAction {
  return {
    type: SET_PROFILE_EDITOR_VISIBILITY,
    visibility
  }
}

export const GET_PERSON_DETAILS = 'GET_PERSON_DETAILS';

export interface IGetPersonDetailsAction extends Action {
  type: typeof GET_PERSON_DETAILS,
}

export function GetPersonDetails(): IGetPersonDetailsAction {
  return {
    type: GET_PERSON_DETAILS,
  }
}

export const SAVE_PERSON_DETAILS = 'SAVE_PERSON_DETAILS';

export interface ISavePersonDetailsAction extends Action {
  type: typeof SAVE_PERSON_DETAILS,
  isUpdate: boolean
}

export function SavePersonDetails(isUpdate: boolean): ISavePersonDetailsAction {
  return {
    type: SAVE_PERSON_DETAILS,
    isUpdate: isUpdate
  }
}

export const SET_PERSON_DETAILS = 'SET_PERSON_DETAILS';

export interface ISetPersonDetailsAction extends Action {
  type: typeof SET_PERSON_DETAILS,
  personDetails: IPersonDetails
}

export function SetPersonDetails(personDetails: IPersonDetails): ISetPersonDetailsAction {
  return {
    type: SET_PERSON_DETAILS,
    personDetails
  }
}

export const SET_PROFILE_RESPONSE_ERROR = 'SET_PROFILE_RESPONSE_ERROR'

export interface ISetProfileResponseErrorAction extends Action {
  type: typeof SET_PROFILE_RESPONSE_ERROR
  payload: IProfileResponseErrorModel
}

export function SetProfileResponseError(model: IProfileResponseErrorModel): ISetProfileResponseErrorAction {
  return {
    type: SET_PROFILE_RESPONSE_ERROR,
    payload: model
  }
}

export const SET_PROFILE_LOADING_STATE = 'SET_PROFILE_LOADING_STATE';

export interface ISetProfileLoadingStateAction extends Action {
  type: typeof SET_PROFILE_LOADING_STATE
  isLoading: boolean
}

export function SetProfileLoadingState(state: boolean): ISetProfileLoadingStateAction {
  return {
    type: SET_PROFILE_LOADING_STATE,
    isLoading: state
  }
}