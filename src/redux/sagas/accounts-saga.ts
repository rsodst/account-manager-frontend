import axios from 'axios';
import { select, all } from 'redux-saga/effects';
import { IAppState } from '../root-reducer';
import settings from "../../environment.settings";
import { takeEvery, put, call } from 'redux-saga/effects';
import { IGetAccountsListAction, GET_ACCOUNTS, SetAccountsList, SetAccountsLoadingState, SetAccountsResponseError, ICreateAccountAction, CREATE_ACCOUNT, SelectAccount, IRefillAccountAction, REFILL_ACCOUNT, SetBalanceAccount, ITransferAccountAction, TRANSFER_ACCOUNT, SetAccountsHistory, IGetAccountsHistoryAction, GET_ACCOUNTS_HISTORY, GetAccountsHistory, GetAccountsList } from '../actions/accounts';
import { IAccountsResponseErrorModel, IAccount, ISetBalance, ITransferAccountModel, IGetAccountsHistory, IAccountAction } from '../../models/accounts';

const getAccountsListHandler = function* (action: IGetAccountsListAction) {
  try {

    yield put(SetAccountsLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    const response = yield call((action: IGetAccountsListAction): Promise<IAccount[]> => {
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

    if (response.length)
    {
      yield put(SelectAccount(response.sort(p=>p.number).reverse()[0].id));
      yield put(GetAccountsHistory({ id:response[0].id, skip: 0, take: 10 }));
    }

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
      return axios.post(`${settings.apiUrl}/accounts/create`, {
        limitByOperation : parseFloat(action.account.limitByOperation),
        description : action.account.description,
        currency : action.account.currency
      }, config)
        .then(result => {
          return <IAccount>{
            ...result.data
          }
        })
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(GetAccountsList({ skip: 0, take: 10 }));
    
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

const refillAccountHandler = function* (action: IRefillAccountAction) {
  try {

    yield put(SetAccountsLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    const response = yield call((action: IRefillAccountAction): Promise<IAccount> => {
      return axios.post(`${settings.apiUrl}/accounts/${action.options.id}/refill`, {amount : parseFloat(action.options.amount)}, config)
        .then(result => {
          return <IAccount>{
            ...result.data
          }
        })
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(SetAccountsLoadingState(false));

    yield put(GetAccountsList({ skip: 0, take: 10 }));

    yield put(SetBalanceAccount(<ISetBalance>{
      id:action.options.id,
      amount:action.options.amount
    }));

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

const transferAccountHandler = function* (action: ITransferAccountAction) {
  try {

    yield put(SetAccountsLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    const response = yield call((action: ITransferAccountAction): Promise<IAccount> => {
      return axios.post(`${settings.apiUrl}/accounts/${action.options.id}/transfer`, {
        amount : parseFloat(action.options.amount),
        id: action.options.id,
        destinationAccountNumber: parseInt(action.options.destinationAccountNumber),
        currency:action.options.currency
      }, config)
        .then(result => {
          return <IAccount>{
            ...result.data
          }
        })
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(SetAccountsLoadingState(false));

    yield put(GetAccountsList({ skip: 0, take: 10 }));

    yield put(SetBalanceAccount(<ISetBalance>{
      id:action.options.id,
      amount:action.options.amount*-1
    }));

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

const getAccountsHistoryHandler = function* (action: IGetAccountsHistoryAction) {
  try {

    yield put(SetAccountsLoadingState(true));

    let state: IAppState = yield select();

    const config = {
      headers: { Authorization: `Bearer ${state.authentication.credential.accessToken}` }
    };

    const response = yield call((action: IGetAccountsHistoryAction): Promise<IAccountAction[]> => {
      return axios.get(`${settings.apiUrl}/accounts/${action.options.id}/actions/${action.options.skip}/${action.options.take}`, config)
        .then(result => {

          return result.data.map(p => {
            return <IAccountAction>{
              ...p
            }
          });
        })
        .catch(error => {
          throw error;
        });
    }, action);

    yield put(SetAccountsHistory(response));

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


export default function* AccountsSagas() {
  yield all([
    takeEvery(GET_ACCOUNTS, getAccountsListHandler),
    takeEvery(CREATE_ACCOUNT, createAccountHandler),
    takeEvery(REFILL_ACCOUNT, refillAccountHandler),
    takeEvery(TRANSFER_ACCOUNT, transferAccountHandler),
    takeEvery(GET_ACCOUNTS_HISTORY, getAccountsHistoryHandler)
  ]);
}
