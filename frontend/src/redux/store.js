import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'
import coreReducer from './reducer';

export const store = createStore(
    coreReducer,
    applyMiddleware(thunk)
);

export default store;