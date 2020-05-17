import {combineReducers} from "redux";
import AuthenticationReducer from '../components/authentication/authentication-reducer';

const rootReducer = combineReducers({
  authentication:AuthenticationReducer
});

export default rootReducer;
