import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import unauthorizedMiddleware from "../middleware/unauthorized-middleware";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware
  (
    sagaMiddleware, 
    routerMiddleware(history), 
    unauthorizedMiddleware
    )));

sagaMiddleware.run(rootSaga);

export default store;