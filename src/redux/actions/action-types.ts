import { ISetAuthLoadingStateAction, ISetAuthResponseErrorAction, ISignInRequestAction, ISignUpRequestAction, ISetUserCredentialAction, ISetSignOutStateAction } from './authentication';
import { ISetPersonDetailsAction, IGetPersonDetailsAction, ISetProfileLoadingStateAction, ISetProfileResponseErrorAction, ISavePersonDetailsAction, ISetProfileEditorVisibilityAction, ICreateProfileConfirmationAction } from './profile-editor';
import { ISetAvatarEditorVisibilityAction, IGetUserAvatarAction, ISetUserAvatarAction, ISetAvatarResponseErrorAction, ISaveUserAvatarAction, ISetAvatarLoadingStateAction } from './avatar-editor';
import { IGetAccountsListAction, ISetAccountsResponseErrorAction, ISetAccountsListAction, ISetAccountsLoadingStateAction, ISetAccountCreateVisibilityAction, ISelectAccountAction, IRefillAccountAction, ITransferAccountAction, ISetBalanceAccountAction, ISetAccountsHistoryAction } from './accounts';

export type ActionTypes =
  ISetAuthLoadingStateAction |
  ISetAuthResponseErrorAction |
  ISignInRequestAction |
  ISignUpRequestAction |
  ISetUserCredentialAction |
  ISetSignOutStateAction |
  ISetPersonDetailsAction |
  IGetPersonDetailsAction |
  ISetProfileLoadingStateAction |
  ISetProfileResponseErrorAction |
  ISavePersonDetailsAction | 
  ISetProfileEditorVisibilityAction |
  ISetAvatarEditorVisibilityAction |
  IGetUserAvatarAction |
  ISetUserAvatarAction |
  ISetAvatarResponseErrorAction |
  ISaveUserAvatarAction | 
  ISetAvatarLoadingStateAction | 
  IGetAccountsListAction | 
  ISetAccountsResponseErrorAction | 
  ISetAccountsListAction | 
  ISetAccountsLoadingStateAction | 
  ICreateProfileConfirmationAction | 
  ISetAccountCreateVisibilityAction | 
  ISelectAccountAction |
  IRefillAccountAction | 
  ISetBalanceAccountAction | 
  ISetAccountsHistoryAction 
  ;