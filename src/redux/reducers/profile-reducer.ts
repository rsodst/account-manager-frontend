import { Reducer } from 'redux';
import { AuthenticationActionTypes } from "../actions/action-types";
import { IPersonDetails, SET_PERSON_DETAILS } from '../actions/set-person-details';
import { GET_PERSON_DETAILS } from '../actions/get-person-details';
import { SET_PROFILE_LOADING_STATE } from '../actions/profile-loading-state-action';
import { SET_PROFILE_RESPONSE_ERROR } from '../actions/profile-response-error-action';

export interface IProfileState {
  personDetails: IPersonDetails
  isLoading: boolean
}

const initialState: IProfileState = {
  personDetails: <IPersonDetails>{
    firstName: "",
    lastName: "",
    middleName: "",
    id:""
  },
  isLoading: false
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
    default: return state;
  }
}

export default ProfileReducer;
