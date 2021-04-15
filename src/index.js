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
store.dispatch({ type: ADD_CAR, car: { name: 'yellow', size: 3, direction: 'V', col: 4, row: 0 } });
store.dispatch({ type: ADD_CAR, car: { name: 'orange', size: 2, direction: 'V', col: 2, row: 3 } });
store.dispatch({ type: ADD_CAR, car: { name: 'green', size: 2, direction: 'H', col: 0, row: 3 } });
store.dispatch({ type: ADD_CAR, car: { name: 'turquoise', size: 2, direction: 'V', col: 1, row: 4 } });
store.dispatch({ type: ADD_CAR, car: { name: 'lightGreen', size: 2, direction: 'H', col: 2, row: 5 } });
store.dispatch({ type: ADD_CAR, car: { name: 'darkGreen', size: 2, direction: 'V', col: 5, row: 0 } });
store.dispatch({ type: ADD_CAR, car: { name: 'gray', size: 2, direction: 'H', col: 4, row: 4 } });
store.dispatch({ type: ADD_CAR, car: { name: 'brown', size: 2, direction: 'V', col: 3, row: 0 } });
store.dispatch({ type: ADD_CAR, car: { name: 'blue', size: 3, direction: 'H', col: 0, row: 0 } });
store.dispatch({ type: ADD_CAR, car: { name: 'pink', size: 2, direction: 'H', col: 1, row: 1 } });
store.dispatch({ type: ADD_CAR, car: { name: 'purple', size: 2, direction: 'V', col: 0, row: 1 } });

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
