import axios from 'axios';
import {push} from 'react-router-redux'
import settings from "../../environment.settings";
import { takeEvery, put, call } from 'redux-saga/effects';
import { SetAuthLoadingState } from '../actions/auth-loading-state-action';
import { SEND_SIGNUP_REQUEST } from '../actions/signup-request-action';
import { SetUserCredential, IUserCredential } from '../actions/user-credential-action';
import { ISignInRequestAction, SEND_SIGNIN_REQUEST } from '../actions/signin-request-action';
import { SetAuthResponseError, IResponseErrorModel } from '../actions/auth-response-error-action';
import { GetPersonDetails } from '../actions/get-person-details';

function createHandler(host: string) {
  let handler = function* (action: ISignInRequestAction) {
    try {

      yield put(SetAuthLoadingState(true));

      const response = yield call(
        (action: ISignInRequestAction) : Promise<IUserCredential> => {
        return axios.post(host, action.payload)
          .then(result => {
            let credential : IUserCredential = {
              userId:result.data.userId,
              email:result.data.email,
              accessToken:result.data.value,
              issuedDate:result.data.issuedDate,
              isAuthenticated : true
            }
            return credential;
          })
          .catch(error => {
            throw error;
          });
      }, action);

      yield put(SetUserCredential(<IUserCredential>response));

      yield put(SetAuthLoadingState(false));

      yield put(push("account"));

      yield put(GetPersonDetails());

    } catch (exception) {

      yield put(SetAuthLoadingState(false));

      var model: IResponseErrorModel;

      if (exception.response) {
        model = <IResponseErrorModel>{
          status: exception.response.status,
          message: exception.message,
          errors: exception.response.data.errors
        }
      } else {
        model = <IResponseErrorModel>{
          status: 0,
          message: exception.message,
          errors: exception.message
        }
      }

      yield put(SetAuthResponseError(model));
    }
  }

  return handler;
}

export function* watchSignIn() {
  yield takeEvery(SEND_SIGNIN_REQUEST, createHandler(`${settings.apiUrl}/user/signin`));
}

export function* watchSignUp() {
  yield takeEvery(SEND_SIGNUP_REQUEST, createHandler(`${settings.apiUrl}/user/signup`));
}
