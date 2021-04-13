import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import { carReducer, cellReducer } from "./components/Parking/reducers";


const rootReducer = combineReducers({ cars: carReducer, cells: cellReducer })

export const store = createStore(rootReducer, applyMiddleware(logger));