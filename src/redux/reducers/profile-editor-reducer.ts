import { Reducer } from 'redux';
import { ActionTypes } from "../actions/action-types";
import { IPersonDetails } from '../../models/profile-editor';
import { SET_PERSON_DETAILS, SET_PROFILE_LOADING_STATE, SET_PROFILE_RESPONSE_ERROR, SET_PROFILE_EDITOR_VISIBILITY } from '../actions/profile-editor';
import { IProfileResponseErrorModel } from '../../models/profile-editor';

export interface IProfileEditorState {
  personDetails: IPersonDetails
  isLoading: boolean
  isEditorOpen: boolean
  responseError: IProfileResponseErrorModel
}

const initialState: IProfileEditorState = {
  personDetails: {
    firstName: "",
    lastName: "",
    middleName: "",
    id: ""
  },
  isLoading: false,
  isEditorOpen: false,
  responseError: null
};

const ProfileReducer: Reducer<IProfileEditorState, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PERSON_DETAILS:
      return {
        ...state,
        personDetails: action.personDetails
      }
    case SET_PROFILE_LOADING_STATE:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_PROFILE_RESPONSE_ERROR:
      return {
        ...state,
        responseError: action.payload
      }
    case SET_PROFILE_EDITOR_VISIBILITY:
      return {
        ...state,
        isEditorOpen: action.visibility
      }
    default: return state;
  }
}

export default ProfileReducer;
