import { Reducer } from 'redux';
import { AuthenticationActionTypes } from "../actions/action-types";
import { IPersonDetails } from '../../models/profile';
import { SET_PERSON_DETAILS, SET_PROFILE_LOADING_STATE, SET_PROFILE_RESPONSE_ERROR } from '../actions/profile';

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
