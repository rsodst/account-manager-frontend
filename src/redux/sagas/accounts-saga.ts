import axios from 'axios';
import { select, all } from 'redux-saga/effects';
import { IAppState } from '../root-reducer';
import settings from "../../environment.settings";
import { takeEvery, put, call } from 'redux-saga/effects';
import { IGetAccountsListAction, GET_ACCOUNTS, SetAccountsList, SetAccountsLoadingState, SetAccountsResponseError, ICreateAccountAction, CREATE_ACCOUNT } from '../actions/accounts';
import { IAccountsResponseErrorModel, IAccount } from '../../models/accounts';

const getAccountsListHandler = function* (action: IGetAccountsListAction) {
  try {

    yield put(SetAccountsLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    const response = yield call((action: IGetAccountsListAction): Promise<Account[]> => {
      return axios.get(`${settings.apiUrl}/accounts/list/${action.options.skip}/${action.options.take}`, config)
        .then(result => {

          return result.data.map(p => {
            return <IAccount>{
              ...p
            }
          });
        })
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(SetAccountsList(response));

    yield put(SetAccountsLoadingState(false));

  } catch (exception) {

    yield put(SetAccountsLoadingState(false));

    var model: IAccountsResponseErrorModel;

    if (exception.response) {
      model = <IAccountsResponseErrorModel>{
        status: exception.response.status,
        message: exception.message,
        errors: exception.response.data.errors
      }
    } else {
      model = <IAccountsResponseErrorModel>{
        status: 0,
        message: exception.message,
        errors: exception.message
      }
    }

    yield put(SetAccountsResponseError(model));
  }
}

const createAccountHandler = function* (action: ICreateAccountAction) {
  try {

    yield put(SetAccountsLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    const response = yield call((action: ICreateAccountAction): Promise<IAccount> => {
      return axios.post(`${settings.apiUrl}/accounts/create`, action.account, config)
        .then(result => {
          return <IAccount>{
            ...result.data
          }
        })
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(SetAccountsList([response]));

    yield put(SetAccountsLoadingState(false));

  } catch (exception) {

    yield put(SetAccountsLoadingState(false));

    var model: IAccountsResponseErrorModel;

    if (exception.response) {
      model = <IAccountsResponseErrorModel>{
        status: exception.response.status,
        message: exception.message,
        errors: exception.response.data.errors
      }
    } else {
      model = <IAccountsResponseErrorModel>{
        status: 0,
        message: exception.message,
        errors: exception.message
      }
    }

    yield put(SetAccountsResponseError(model));
  }
}

export function* watchGetAccountList() {
  yield takeEvery(GET_ACCOUNTS, getAccountsListHandler);
}

export function* watchCreateAccountList() {
  yield takeEvery(CREATE_ACCOUNT, createAccountHandler);
}


export default function* AccountsSagas() {
  yield all([
    watchGetAccountList(),
    watchCreateAccountList()
  ]);
}
