import axios from 'axios';
import { push } from 'react-router-redux'
import settings from "../../environment.settings";
import { takeEvery, put, call, all, select } from 'redux-saga/effects';
import { ISignInRequestAction, SetAuthLoadingState, SetUserCredential, SetAuthResponseError, SEND_SIGNIN_REQUEST, SEND_SIGNUP_REQUEST, ISetUserEmailAction, ISetUserPasswordAction, SET_USER_PASSWORD, SET_USER_EMAIL, DELETE_USER, IDeleteUserAction } from '../actions/authentication';
import { IUserCredential, IResponseErrorModel } from '../../models/authentication';
import { CreateProfileConfirmation, SetProfileLoadingState, SetProfileResponseError } from '../actions/profile-editor';
import { IAppState } from '../root-reducer';

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

const setUserEmailHandler = function* (action: ISetUserEmailAction) {
  try {

    yield put(SetProfileLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    yield call((action: ISetUserEmailAction) => {
      return axios.put(`${settings.apiUrl}/user/email`, { email: action.email }, config)
        .then(result => result.data)
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(SetProfileLoadingState(false));

    yield put(SetUserCredential({
      ...state.authentication.credential,
      email: action.email
    }));

  } catch (exception) {

    yield put(SetProfileLoadingState(false));

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

    yield put(SetProfileResponseError(model));
  }
}

const setUserPasswordHandler = function* (action: ISetUserPasswordAction) {
  try {

    yield put(SetProfileLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    yield call((action: ISetUserPasswordAction) => {
      return axios.put(`${settings.apiUrl}/user/password`, { currentPassword: action.password.currentPassword, newPassword: action.password.newPassword }, config)
        .then(result => result.data)
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(SetProfileLoadingState(false));

  } catch (exception) {

    yield put(SetProfileLoadingState(false));

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

    yield put(SetProfileResponseError(model));
  }
}

const deleteUserHandler = function* (action: IDeleteUserAction) {
  try {

    yield put(SetProfileLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    yield call((action: IDeleteUserAction) => {
      return axios.delete(`${settings.apiUrl}/user`, config)
        .then(result => result.data)
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(SetProfileLoadingState(false));

  } catch (exception) {

    yield put(SetProfileLoadingState(false));

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

    yield put(SetProfileResponseError(model));
  }
}

export default function* AuthenticationSaga() {
  yield all([
    yield takeEvery(SEND_SIGNIN_REQUEST, signInHandler),
    yield takeEvery(SEND_SIGNUP_REQUEST, signUpHandler),
    yield takeEvery(SET_USER_PASSWORD, setUserPasswordHandler),
    yield takeEvery(SET_USER_EMAIL, setUserEmailHandler),
    yield takeEvery(DELETE_USER, deleteUserHandler),
  ]);
}