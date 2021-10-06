import { combineReducers } from 'redux';
import auth from './auth';
import question from './question';
import test from './test';
import users from './users'

export const reducers = combineReducers({ auth, question, test, users });
