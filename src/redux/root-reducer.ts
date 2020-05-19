import { combineReducers } from "redux";
import AuthenticationReducer from './reducers/authentication-reducer';
import { IAuthenticationState } from './reducers/authentication-reducer';
import ProfileReducer, { IProfileEditorState } from './reducers/profile-editor-reducer';
import AvatarEditorReducer, { IAvatarEditorState } from './reducers/avatar-editor-reducer';

export interface IAppState {
  authentication: IAuthenticationState,
  profileEditor: IProfileEditorState,
  avatarEditor: IAvatarEditorState
}

const rootReducer = combineReducers<IAppState>({
  authentication: AuthenticationReducer,
  profileEditor: ProfileReducer,
  avatarEditor: AvatarEditorReducer
});

export default rootReducer;
