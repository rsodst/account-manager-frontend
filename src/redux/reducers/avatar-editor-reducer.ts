import { Reducer } from 'redux';
import { ActionTypes } from "../actions/action-types";
import { IUserAvatar, IAvatarResponseErrorModel } from '../../models/avatar-editor';
import { SET_USER_AVATAR, SET_AVATAR_LOADING_STATE, SET_AVATAR_RESPONSE_ERROR, SET_AVATAR_EDITOR_VISIBILITY } from '../actions/avatar-editor';

export interface IAvatarEditorState {
  userAvatar: IUserAvatar
  isLoading: boolean
  isEditorOpen: boolean
  responseError: IAvatarResponseErrorModel
}

const initialState: IAvatarEditorState = {
  userAvatar: <IUserAvatar>{ filename: "default.png" },
  isLoading: false,
  isEditorOpen: false,
  responseError: null
};

const AvatarEditorReducer: Reducer<IAvatarEditorState, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AVATAR:
      return {
        ...state,
        personDetails: action.userAvatar
      }
    case SET_AVATAR_LOADING_STATE:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_AVATAR_RESPONSE_ERROR:
      return {
        ...state,
        responseError: action.payload
      }
    case SET_AVATAR_EDITOR_VISIBILITY:
      return {
        ...state,
        isEditorOpen: action.visibility
      }
    default: return state;
  }
}

export default AvatarEditorReducer;
