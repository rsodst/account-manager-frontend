import './styles/app.scss';
import React from "react";
import { render } from "react-dom";
import AppRouter from './app-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root-reducer';
import createSagaMiddleware from 'redux-saga';
import { watchSignIn } from './components/authentication/signin-saga';

const sageMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sageMiddleware));

sageMiddleware.run(watchSignIn);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter></AppRouter>
    </Provider>
  );
}

render(<App />, document.getElementById("root"));

