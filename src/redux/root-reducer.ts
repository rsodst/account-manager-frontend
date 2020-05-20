import { combineReducers } from "redux";
import AuthenticationReducer from './reducers/authentication-reducer';
import { IAuthenticationState } from './reducers/authentication-reducer';
import ProfileReducer, { IProfileEditorState } from './reducers/profile-editor-reducer';
import AvatarEditorReducer, { IAvatarEditorState } from './reducers/avatar-editor-reducer';
import AccountsReducer from './reducers/accounts-reducer';
import { IAccountsState } from './reducers/accounts-reducer';

export interface IAppState {
  authentication: IAuthenticationState,
  profileEditor: IProfileEditorState,
  avatarEditor: IAvatarEditorState,
  accounts : IAccountsState
}

const rootReducer = combineReducers<IAppState>({
  authentication: AuthenticationReducer,
  profileEditor: ProfileReducer,
  avatarEditor: AvatarEditorReducer,
  accounts : AccountsReducer
});

export default rootReducer;
