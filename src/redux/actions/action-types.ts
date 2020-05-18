import { ISetAuthLoadingStateAction } from "./auth-loading-state-action";
import { ISetAuthResponseErrorAction } from "./auth-response-error-action";
import { ISignInRequestAction } from './signin-request-action';
import { ISignUpRequestAction } from './signup-request-action';
import { ISetUserCredentialAction } from './user-credential-action';
import { ISetSignOutStateAction } from './signout-action';
import { IGetPersonDetailsAction } from './get-person-details';
import { ISetPersonDetailsAction } from './set-person-details';
import { ISetProfileResponseErrorAction } from './profile-response-error-action';
import { ISetProfileLoadingStateAction } from './profile-loading-state-action';
import { ISavePersonDetailsAction } from './save-person-details';

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
  ISavePersonDetailsAction;