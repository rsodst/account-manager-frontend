import { all } from 'redux-saga/effects';
import AuthenticationSaga from './sagas/authentication-saga';
import AvatarEditorSagas from './sagas/avatar-editor-saga';
import profileEditorSagas from './sagas/profile-editor-saga';
import AccountsSagas from './sagas/accounts-saga';

export default function* rootSaga() {
  yield all([
    AuthenticationSaga(),
    AvatarEditorSagas(),
    profileEditorSagas(),
    AccountsSagas() 
  ]);
}