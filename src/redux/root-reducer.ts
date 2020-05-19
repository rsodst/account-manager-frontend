import { combineReducers } from "redux";
import AuthenticationReducer from './reducers/authentication-reducer';
import { IAuthenticationState } from './reducers/authentication-reducer';
import ProfileReducer, { IProfileState } from './reducers/profile-editor-reducer';

export interface IAppState {
  authentication: IAuthenticationState,
  profile: IProfileState
}

const rootReducer = combineReducers<IAppState>({
  authentication: AuthenticationReducer,
  profile: ProfileReducer
});

export default rootReducer;
