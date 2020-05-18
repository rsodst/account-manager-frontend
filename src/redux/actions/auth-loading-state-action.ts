import { Action } from "redux";

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