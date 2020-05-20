import axios from 'axios';
import { select, all } from 'redux-saga/effects';
import { IAppState } from '../root-reducer';
import settings from "../../environment.settings";
import { takeEvery, put, call } from 'redux-saga/effects';
import { SetProfileLoadingState } from '../actions/profile-editor';
import { IResponseErrorModel } from '../../models/authentication';
import { IGetUserAvatarAction, SetAvatarLoadingStateAction, SetAvatarResponseError, SetUserAvatarAction, GET_USER_AVATAR } from '../actions/avatar-editor';
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

function* watchGetAvatar() {
  yield takeEvery(GET_USER_AVATAR, getAvatarHandler);
}

export default function* AvatarEditorSagas() {
  yield all([
    watchGetAvatar()
  ]);
}