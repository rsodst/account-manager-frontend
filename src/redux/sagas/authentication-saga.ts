import axios from 'axios';
import { push } from 'react-router-redux'
import settings from "../../environment.settings";
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { ISignInRequestAction, SetAuthLoadingState, SetUserCredential, SetAuthResponseError, SEND_SIGNIN_REQUEST, SEND_SIGNUP_REQUEST } from '../actions/authentication';
import { IUserCredential, IResponseErrorModel } from '../../models/authentication';
import { CreateProfileConfirmation } from '../actions/profile-editor';

let signInHandler = function* (action: ISignInRequestAction) {
  try {

    yield put(SetAuthLoadingState(true));

    const response = yield call(
      (action: ISignInRequestAction): Promise<IUserCredential> => {
        return axios.post(`${settings.apiUrl}/user/signin`, action.payload)
          .then(result => {
            let credential: IUserCredential = {
              userId: result.data.userId,
              email: result.data.email,
              accessToken: result.data.value,
              issuedDate: result.data.issuedDate,
              isAuthenticated: true
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

let signUpHandler = function* (action: ISignInRequestAction) {
  try {

    yield put(SetAuthLoadingState(true));

    const response = yield call(
      (action: ISignInRequestAction): Promise<IUserCredential> => {
        return axios.post(`${settings.apiUrl}/user/signup`, action.payload)
          .then(result => {
            let credential: IUserCredential = {
              userId: result.data.userId,
              email: result.data.email,
              accessToken: result.data.value,
              issuedDate: result.data.issuedDate,
              isAuthenticated: true
            }
            return credential;
          })
          .catch(error => {
            throw error;
          });
      }, action);

    yield put(SetUserCredential(<IUserCredential>response));

    yield put(CreateProfileConfirmation());

    yield put(SetAuthLoadingState(false));


    yield put(push("account"));

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

function* watchSignIn() {
  yield takeEvery(SEND_SIGNIN_REQUEST, signInHandler);
}

function* watchSignUp() {
  yield takeEvery(SEND_SIGNUP_REQUEST, signUpHandler);
}

export default function* AuthenticationSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
  ]);
}