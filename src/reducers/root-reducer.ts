import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux';
import AuthenticationReducer from '../components/authentication/authentication-reducer';

const rootReducer = combineReducers({
  authentication:AuthenticationReducer,
  routing : routerReducer
});

export default rootReducer;
