import './styles/app.scss';
import React from "react";
import { render } from "react-dom";
import AppRouter from './app-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/root-reducer';

const store = createStore(rootReducer);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter></AppRouter>
    </Provider>
  );
}

store.subscribe(()=>{
  console.log(store.getState());
});

render(<App />, document.getElementById("root"));

