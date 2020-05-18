import { Action } from "redux"

export const SET_PROFILE_RESPONSE_ERROR = 'SET_PROFILE_RESPONSE_ERROR'

export interface IProfileResponseErrorModel {
  status: number,
  message: string,
  errors:string
}

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