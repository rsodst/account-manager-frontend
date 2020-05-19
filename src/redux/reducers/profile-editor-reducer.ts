import { Reducer } from 'redux';
import { AuthenticationActionTypes } from "../actions/action-types";
import { IPersonDetails } from '../../models/profile-editor';
import { SET_PERSON_DETAILS, SET_PROFILE_LOADING_STATE, SET_PROFILE_RESPONSE_ERROR, SET_PROFILE_EDITOR_VISIBILITY } from '../actions/profile-editor';
import { IResponseErrorModel } from '../../models/authentication';

export interface IProfileState {
  personDetails: IPersonDetails
  isLoading: boolean
  isEditorOpen: boolean
  responseError: IResponseErrorModel
}

const initialState: IProfileState = {
  personDetails: {
    firstName: "",
    lastName: "",
    middleName: "",
    id:""
  },
  isLoading: false,
  isEditorOpen: false,
  responseError : null
};

const ProfileReducer: Reducer<IProfileState, AuthenticationActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PERSON_DETAILS:
      localStorage.setItem('fullName', `${action.personDetails.lastName} ${action.personDetails.firstName} ${action.personDetails.middleName}`);
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
          isEditorOpen:action.visibility
        }
    default: return state;
  }
}

export default ProfileReducer;
