import { Action } from "redux";
import { IUserAvatar, IAvatarResponseErrorModel } from "../../models/avatar-editor";

export const SET_AVATAR_EDITOR_VISIBILITY = 'SET_AVATAR_EDITOR_VISIBILITY';

export interface ISetAvatarEditorVisibilityAction extends Action {
  type: typeof SET_AVATAR_EDITOR_VISIBILITY
  visibility: boolean
}

export function SetAvatarEditorVisibilityAction(visibility: boolean): ISetAvatarEditorVisibilityAction {
  return {
    type: SET_AVATAR_EDITOR_VISIBILITY,
    visibility
  }
}

export const GET_USER_AVATAR = 'GET_USER_AVATAR';

export interface IGetUserAvatarAction extends Action {
  type: typeof GET_USER_AVATAR,
}

export function GetUserAvatar(): IGetUserAvatarAction {
  return {
    type: GET_USER_AVATAR,
  }
}

export const SAVE_USER_AVATAR = 'SAVE_USER_AVATAR';

export interface ISaveUserAvatarAction extends Action {
  type: typeof SAVE_USER_AVATAR,
  isUpdate: boolean
}

export function SaveUserAvatar(isUpdate: boolean): ISaveUserAvatarAction {
  return {
    type: SAVE_USER_AVATAR,
    isUpdate: isUpdate
  }
}

export const SET_USER_AVATAR = 'SET_USER_AVATAR';

export interface ISetUserAvatarAction extends Action {
  type: typeof SET_USER_AVATAR,
  userAvatar: IUserAvatar
}

export function SetUserAvatarAction(userAvatar: IUserAvatar): ISetUserAvatarAction {
  return {
    type: SET_USER_AVATAR,
    userAvatar
  }
}

export const SET_AVATAR_RESPONSE_ERROR = 'SET_AVATAR_RESPONSE_ERROR'

export interface ISetAvatarResponseErrorAction extends Action {
  type: typeof SET_AVATAR_RESPONSE_ERROR
  payload: IAvatarResponseErrorModel
}

export function SetAvatarResponseError(model: IAvatarResponseErrorModel): ISetAvatarResponseErrorAction {
  return {
    type: SET_AVATAR_RESPONSE_ERROR,
    payload: model
  }
}

export const SET_AVATAR_LOADING_STATE = 'SET_AVATAR_LOADING_STATE';

export interface ISetAvatarLoadingStateAction extends Action {
  type: typeof SET_AVATAR_LOADING_STATE
  isLoading: boolean
}

export function SetAvatarLoadingStateAction(state: boolean): ISetAvatarLoadingStateAction {
  return {
    type: SET_AVATAR_LOADING_STATE,
    isLoading: state
  }
}