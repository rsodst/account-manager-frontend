import { ISetAuthLoadingStateAction, ISetAuthResponseErrorAction, ISignInRequestAction, ISignUpRequestAction, ISetUserCredentialAction, ISetSignOutStateAction } from './authentication';
import { ISetPersonDetailsAction, IGetPersonDetailsAction, ISetProfileLoadingStateAction, ISetProfileResponseErrorAction, ISavePersonDetailsAction, ISetProfileEditorVisibilityAction } from './profile-editor';

export type AuthenticationActionTypes =
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
  ISetProfileEditorVisibilityAction;