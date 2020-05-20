import { Reducer } from 'redux';
import { ActionTypes } from '../actions/action-types';
import { SET_ACCOUNTS_RESPONSE_ERROR, SET_ACCOUNTS, SET_ACCOUNTS_LOADING_STATE, SET_ACCOUNT_CREATE_VISIBILITY, SELECT_ACCOUNT, REFILL_ACCOUNT } from '../actions/accounts';
import { IAccountsResponseErrorModel, IAccount } from '../../models/accounts';

export interface IAccountsState {
  selectedAccount: IAccount,
  accounts: IAccount[],
  createAccountVisibility: boolean,
  isLoading: boolean,
  responseError: IAccountsResponseErrorModel
}

const initilaState: IAccountsState = {
  selectedAccount: null,
  accounts: [],
  createAccountVisibility: false,
  isLoading: false,
  responseError: null
}

const AccountsReducer: Reducer<IAccountsState, ActionTypes> = (state = initilaState, action) => {
  switch (action.type) {
    case SET_ACCOUNTS_RESPONSE_ERROR:
      return {
        ...state,
        responseError: action.responseError
      }
    case SET_ACCOUNTS_LOADING_STATE:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case SET_ACCOUNT_CREATE_VISIBILITY:
      return {
        ...state,
        createAccountVisibility: action.visibility
      }

    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: state.accounts.concat(action.accounts)
      }
    case SELECT_ACCOUNT:
      return {
        ...state,
        selectedAccount: state.accounts.find(p => p.id == action.id)
      }
      case REFILL_ACCOUNT:
        return {
          ...state,
          accounts: state.accounts.map(p=> { 
            if (p.id == action.options.id) {
              p.balance += parseFloat(action.options.amount);
            }
            return p;
           })
        }
      
    default: return state;
  }
}

export default AccountsReducer;