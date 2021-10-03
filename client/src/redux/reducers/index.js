import { combineReducers } from 'redux';
import auth from './auth';
import question from './question';
import test from './test';

export const reducers = combineReducers({ auth, question, test });
