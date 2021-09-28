import { combineReducers } from 'redux';
import auth from './auth';
import question from './question';

export const reducers = combineReducers({ auth, question });
