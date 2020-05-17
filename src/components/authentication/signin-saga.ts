import { takeEvery, put, call } from 'redux-saga/effects';
import { SEND_SIGNIN_REQUEST, COMPLETE_SIGNIN_REQUEST, FAIL_SIGNIN_REQUEST } from './actions';
import 'axios';
import Axios from 'axios';
import AuthenticationLocalStorage from './authentication-localstorage';

function* workerSignIn(action) {

  let { email, password} = action.payload;

  try {
    const response = yield call((email, password) => {
      return Axios.post('https://localhost:5001/user/signin', {
        email,
        password
      })
        .then(result => result)
        .catch(error => {
          throw error;
        });
    }, email, password);

    yield put({
      type: COMPLETE_SIGNIN_REQUEST,
      payload: response
    });

    AuthenticationLocalStorage.SetAuthenticationData(response.data.value);

    window.location.href = 'account';

  } catch (error) {
    yield put({
      type: FAIL_SIGNIN_REQUEST,
      payload: error
    });
  }
}

export function* watchSignIn() {
  yield takeEvery(SEND_SIGNIN_REQUEST, workerSignIn);
}