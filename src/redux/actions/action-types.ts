import { ISetAuthLoadingStateAction, ISetAuthResponseErrorAction, ISignInRequestAction, ISignUpRequestAction, ISetUserCredentialAction, ISetSignOutStateAction } from './authentication';
import { ISetPersonDetailsAction, IGetPersonDetailsAction, ISetProfileLoadingStateAction, ISetProfileResponseErrorAction, ISavePersonDetailsAction, ISetProfileEditorVisibilityAction } from './profile-editor';
import { ISetAvatarEditorVisibilityAction, IGetUserAvatarAction, ISetUserAvatarAction, ISetAvatarResponseErrorAction, ISaveUserAvatarAction, ISetAvatarLoadingStateAction } from './avatar-editor';

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
  ISetProfileEditorVisibilityAction |
  ISetAvatarEditorVisibilityAction |
  IGetUserAvatarAction |
  ISetUserAvatarAction |
  ISetAvatarResponseErrorAction |
  ISaveUserAvatarAction | 
  ISetAvatarLoadingStateAction;