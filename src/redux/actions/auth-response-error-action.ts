import { Action } from "redux"

export const SET_AUTH_RESPONSE_ERROR = 'SET_AUTH_RESPONSE_ERROR'

export interface IResponseErrorModel {
  status: number,
  message: string,
  errors:string
}

export interface ISetAuthResponseErrorAction extends Action {
  type: typeof SET_AUTH_RESPONSE_ERROR
  payload: IResponseErrorModel
}

export function SetAuthResponseError(model: IResponseErrorModel): ISetAuthResponseErrorAction {
  return {
    type: SET_AUTH_RESPONSE_ERROR,
    payload: model
  }
}