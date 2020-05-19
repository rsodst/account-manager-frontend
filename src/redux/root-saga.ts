import { all } from 'redux-saga/effects';
import { watchSignIn, watchSignUp } from './sagas/authentication-saga';
import { watchGetPersonDetails, watchSavePersonDetails } from './sagas/profile-editor-saga';

export default function* rootSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchGetPersonDetails(),
    watchSavePersonDetails()
  ]);
}