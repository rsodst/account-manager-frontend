import './styles/app.scss';
import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import AppRouter from './router/app-router';
import store from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
}

render(<App />, document.getElementById("root"));

