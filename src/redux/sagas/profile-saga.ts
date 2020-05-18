import axios from 'axios';
import { select } from 'redux-saga/effects'
import { IAppState } from '../root-reducer';
import settings from "../../environment.settings";
import { takeEvery, put, call } from 'redux-saga/effects';
import { IResponseErrorModel } from '../actions/auth-response-error-action';
import { SetProfileLoadingState } from '../actions/profile-loading-state-action';
import { IPersonDetails, SetPersonDetails } from '../actions/set-person-details';
import { SetProfileResponseError } from '../actions/profile-response-error-action';
import { GET_PERSON_DETAILS, IGetPersonDetailsAction } from '../actions/get-person-details';
import { SAVE_PERSON_DETAILS, ISavePersonDetailsAction } from '../actions/save-person-details';

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
        return axios.put(`${settings.apiUrl}/profile/person-details`, state.profile.personDetails, config)
          .then(result => result.data)
          .catch(error => {
            throw error;
          });
      }, action);
    } else {
      yield call((action: ISavePersonDetailsAction): Promise<IPersonDetails> => {
        return axios.post(`${settings.apiUrl}/profile/person-details`, state.profile.personDetails, config)
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

export function* watchGetPersonDetails() {
  yield takeEvery(GET_PERSON_DETAILS, getPersonDetailsHandler);
}

export function* watchSavePersonDetails() {
  yield takeEvery(SAVE_PERSON_DETAILS, savePersonDetailsHandler);
}


