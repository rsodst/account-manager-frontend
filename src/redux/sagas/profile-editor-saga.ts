import axios from 'axios';
import { select, all } from 'redux-saga/effects';
import { IAppState } from '../root-reducer';
import settings from "../../environment.settings";
import { takeEvery, put, call } from 'redux-saga/effects';
import { IGetPersonDetailsAction, SetProfileLoadingState, SetPersonDetails, SetProfileResponseError, ISavePersonDetailsAction, GET_PERSON_DETAILS, SAVE_PERSON_DETAILS, ICreateProfileConfirmationAction, CREATEA_PROFILE_CONFIRMATION, CREATE_PROFILE_CONFIRMATION, CreateProfileConfirmation } from '../actions/profile-editor';
import { IPersonDetails } from '../../models/profile-editor';
import { IResponseErrorModel } from '../../models/authentication';

const getPersonDetailsHandler = function* (action: IGetPersonDetailsAction) {
  try {

    yield put(SetProfileLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    const response = yield call((action: IGetPersonDetailsAction): Promise<IPersonDetails> => {
      return axios.get(`${settings.apiUrl}/profile/person-details`, config)
        .then(result => {
          let personDetails: IPersonDetails = {
            id: result.data.id,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            middleName: result.data.middleName,
          }

          return personDetails;
        })
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(SetPersonDetails(response));

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

const savePersonDetailsHandler = function* (action: ISavePersonDetailsAction) {
  try {

    yield put(SetProfileLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    if (action.isUpdate) {
      yield call((action: ISavePersonDetailsAction): Promise<IPersonDetails> => {
        return axios.put(`${settings.apiUrl}/profile/person-details`, state.profileEditor.personDetails, config)
          .then(result => result.data)
          .catch(error => {
            throw error;
          });
      }, action);
    } else {
      yield call((action: ISavePersonDetailsAction): Promise<IPersonDetails> => {
        return axios.post(`${settings.apiUrl}/profile/person-details`, state.profileEditor.personDetails, config)
          .then(result => result.data)
          .catch(error => {
            throw error;
          });
      }, action);


    }

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

const createProfileConfirmationHandler = function* (action: ICreateProfileConfirmationAction) {
  try {

    yield put(SetProfileLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    yield call((action: ICreateProfileConfirmationAction) => {
      return axios.post(`${settings.apiUrl}/debug/profile-confirmation`, null, config)
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

function* watchGetPersonDetails() {
  yield takeEvery(GET_PERSON_DETAILS, getPersonDetailsHandler);
}

function* watchSavePersonDetails() {
  yield takeEvery(SAVE_PERSON_DETAILS, savePersonDetailsHandler);
}

function* watchCreateProfileConfirmation() {
  yield takeEvery(CREATE_PROFILE_CONFIRMATION, createProfileConfirmationHandler);
}

export default function* profileEditorSagas() {
  yield all([
    watchGetPersonDetails(),
    watchSavePersonDetails(),
    watchCreateProfileConfirmation()
  ]);
}