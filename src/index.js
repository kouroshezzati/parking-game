import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store'
import { ADD_CAR } from './constants';

store.dispatch({ type: ADD_CAR, car: { name: 'black', size: 2, direction: 'H', col: 4, row: 5 } });
store.dispatch({ type: ADD_CAR, car: { name: 'red', size: 2, direction: 'H', col: 2, row: 2 } });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
