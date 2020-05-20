import { combineReducers } from "redux";
import AuthenticationReducer from './reducers/authentication-reducer';
import { IAuthenticationState } from './reducers/authentication-reducer';
import ProfileReducer, { IProfileEditorState } from './reducers/profile-editor-reducer';
import AvatarEditorReducer, { IAvatarEditorState } from './reducers/avatar-editor-reducer';
import AccountsReducer from './reducers/accounts-reducer';
import { IAccountsState } from './reducers/accounts-reducer';
import { SET_SIGNOUT } from './actions/authentication';

export interface IAppState {
  authentication: IAuthenticationState,
  profileEditor: IProfileEditorState,
  avatarEditor: IAvatarEditorState,
  accounts : IAccountsState
}

const appReducer = combineReducers({
  authentication: AuthenticationReducer,
  profileEditor: ProfileReducer,
  avatarEditor: AvatarEditorReducer,
  accounts : AccountsReducer,
});

const rootReducer = (state, action)=>{
  if (action == SET_SIGNOUT){
    localStorage.removeItem('credential');
    return {};
  }
  return appReducer(state,action);
}



export default rootReducer;
