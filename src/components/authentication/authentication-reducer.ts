import { Reducer } from "redux";
import {
  SEND_SIGNIN_REQUEST,
  COMPLETE_SIGNIN_REQUEST,
  FAIL_SIGNIN_REQUEST
} from './actions';

interface IAuthenticationState {
  user: {},
  waitResponse: boolean,
  responseError: {}
}

const initialState: IAuthenticationState = {
  user: {},
  waitResponse: false,
  responseError: null
};

const AuthenticationReducer: Reducer<IAuthenticationState> = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SEND_SIGNIN_REQUEST:
      return {
        ...state,
        waitResponse: true
      }
    case COMPLETE_SIGNIN_REQUEST:
      return {
        ...state,
        waitResponse: false,
        user : action.payload,
        responseError : null
      }
    case FAIL_SIGNIN_REQUEST:
      console.log('FAILED_REUQEST '+action.payload);
      return {
        ...state,
        waitResponse: false,
        responseError: action.payload
      }
    default: return state;
  }
}

export default AuthenticationReducer;
export {IAuthenticationState};