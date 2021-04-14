import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import reducer from "./components/Parking/reducers";


export const store = createStore(reducer, applyMiddleware(logger));