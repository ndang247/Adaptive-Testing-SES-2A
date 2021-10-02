import { combineReducers } from 'redux';
import auth from './auth';
import test from './test';

export const reducers = combineReducers({ auth, test });
