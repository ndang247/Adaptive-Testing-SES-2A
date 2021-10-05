import { combineReducers } from 'redux';
import auth from './auth';
import question from './question';
import test from './test';
import settings from './settings'
import examroom from './examroom';

export const reducers = combineReducers({ auth, question, test, settings, examroom});
