import { Action } from 'redux';
import { IAccount, IGetAccounts, IAccountsResponseErrorModel, ICreateAccountModel, ISetBalance, IRefillAccountModel, ITransferAccountModel, IGetAccountsHistory, IAccountAction } from '../../models/accounts';

export const GET_ACCOUNTS = "GET_ACCOUNTS";

export interface IGetAccountsListAction extends Action {
  type: typeof GET_ACCOUNTS,
  options: IGetAccounts
}

export function GetAccountsList(options: IGetAccounts): IGetAccountsListAction {
  return {
    type: GET_ACCOUNTS,
    options
  }
}

export const SET_ACCOUNTS = "SET_ACCOUNTS";

export interface ISetAccountsListAction extends Action {
  type: typeof SET_ACCOUNTS
  accounts: IAccount[]
}

export function SetAccountsList(accounts: IAccount[]): ISetAccountsListAction {
  return {
    type: SET_ACCOUNTS,
    accounts
  }
}

//

export const SET_ACCOUNTS_RESPONSE_ERROR = "SET_ACCOUNTS_RESPONSE_ERROR";

export interface ISetAccountsResponseErrorAction extends Action {
  type: typeof SET_ACCOUNTS_RESPONSE_ERROR
  responseError: IAccountsResponseErrorModel
}

export function SetAccountsResponseError(responseError: IAccountsResponseErrorModel): ISetAccountsResponseErrorAction {
  return {
    type: SET_ACCOUNTS_RESPONSE_ERROR,
    responseError
  }
}

export const SET_ACCOUNTS_LOADING_STATE = 'SET_ACCOUNTS_LOADING_STATE';

export interface ISetAccountsLoadingStateAction extends Action {
  type: typeof SET_ACCOUNTS_LOADING_STATE
  isLoading: boolean
}

export function SetAccountsLoadingState(state: boolean): ISetAccountsLoadingStateAction {
  return {
    type: SET_ACCOUNTS_LOADING_STATE,
    isLoading: state
  }
}

export const SET_ACCOUNT_CREATE_VISIBILITY = 'SET_ACCOUNT_CREATE_VISIBILITY';

export interface ISetAccountCreateVisibilityAction extends Action {
  type: typeof SET_ACCOUNT_CREATE_VISIBILITY
  visibility: boolean
}

export function SetAccountCreateVisibility(state: boolean): ISetAccountCreateVisibilityAction {
  return {
    type: SET_ACCOUNT_CREATE_VISIBILITY,
    visibility: state
  }
}

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

export interface ICreateAccountAction extends Action {
  type: typeof CREATE_ACCOUNT
  account: ICreateAccountModel
}

export function CreateAccount(account: ICreateAccountModel): ICreateAccountAction {
  return {
    type: CREATE_ACCOUNT,
    account
  }
}

export const SELECT_ACCOUNT = 'SELECT_ACCOUNT';

export interface ISelectAccountAction extends Action {
  type: typeof SELECT_ACCOUNT
  id: string
}

export function SelectAccount(id: string): ISelectAccountAction {
  return {
    type: SELECT_ACCOUNT,
    id
  }
}

export const SET_BALANCE = 'SET_BALANCE';

export interface ISetBalanceAccountAction extends Action {
  type: typeof SET_BALANCE
  options: ISetBalance
}

export function SetBalanceAccount(options: ISetBalance): ISetBalanceAccountAction {
  return {
    type: SET_BALANCE,
    options
  }
}

export const REFILL_ACCOUNT = 'REFILL_ACCOUNT';

export interface IRefillAccountAction extends Action {
  type: typeof REFILL_ACCOUNT
  options: IRefillAccountModel
}

export function RefillAccount(options: IRefillAccountModel): IRefillAccountAction {
  return {
    type: REFILL_ACCOUNT,
    options
  }
}

export const TRANSFER_ACCOUNT = 'TRANSFER_ACCOUNT';

export interface ITransferAccountAction extends Action {
  type: typeof TRANSFER_ACCOUNT
  options: ITransferAccountModel
}

export function TransferAccount(options: ITransferAccountModel): ITransferAccountAction {
  return {
    type: TRANSFER_ACCOUNT,
    options
  }
}

export const GET_ACCOUNTS_HISTORY = "GET_ACCOUNTS_HISTORY";

export interface IGetAccountsHistoryAction extends Action {
  type: typeof GET_ACCOUNTS_HISTORY,
  options: IGetAccountsHistory
}

export function GetAccountsHistory(options: IGetAccountsHistory): IGetAccountsHistoryAction {
  return {
    type: GET_ACCOUNTS_HISTORY,
    options
  }
}

export const SET_ACCOUNTS_HISTORY = "SET_ACCOUNTS_HISTORY";

export interface ISetAccountsHistoryAction extends Action {
  type: typeof SET_ACCOUNTS_HISTORY
  history: IAccountAction[]
}

export function SetAccountsHistory(history: IAccountAction[]): ISetAccountsHistoryAction {
  return {
    type: SET_ACCOUNTS_HISTORY,
    history
  }
}
