import axios from 'axios';
import { select } from 'redux-saga/effects'
import { IAppState } from '../root-reducer';
import settings from "../../environment.settings";
import { takeEvery, put, call } from 'redux-saga/effects';
import { IGetPersonDetailsAction, SetProfileLoadingState, SetPersonDetails, SetProfileResponseError, ISavePersonDetailsAction, GET_PERSON_DETAILS, SAVE_PERSON_DETAILS } from '../actions/profile-editor';
import { IPersonDetails } from '../../models/profile-editor';
import { IResponseErrorModel } from '../../models/authentication';
import { IGetUserAvatarAction, SetAvatarLoadingStateAction, SetAvatarResponseError, SetUserAvatarAction } from '../actions/avatar-editor';
import { IUserAvatar } from '../../models/avatar-editor';

const getAvatarHandler = function* (action: IGetUserAvatarAction) {
  try {

    yield put(SetProfileLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    const response = yield call((action: IGetUserAvatarAction): Promise<IUserAvatar> => {
      return axios.get(`${settings.apiUrl}/profile/person-photo`, config)
        .then(result => {
          let personDetails: IUserAvatar = {
            id: result.data.id,
            filename : result.data.id
          }

          return personDetails;
        })
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(SetUserAvatarAction(response));

    yield put(SetAvatarLoadingStateAction(false));

  } catch (exception) {

    yield put(SetAvatarLoadingStateAction(false));

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

    yield put(SetAvatarResponseError(model));
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

export function* watchGetAvatar() {
  yield takeEvery(GET_PERSON_DETAILS, getPersonDetailsHandler);
}

export function* watchSaveAvatar() {
  yield takeEvery(SAVE_PERSON_DETAILS, savePersonDetailsHandler);
}


