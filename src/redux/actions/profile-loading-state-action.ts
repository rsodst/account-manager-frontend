import { Action } from "redux";

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