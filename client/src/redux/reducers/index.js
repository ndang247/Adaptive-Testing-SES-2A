import { combineReducers } from 'redux';
import auth from './auth';
import question from './question';
import test from './test';
import settings from './settings'

export const reducers = combineReducers({ auth, question, test, settings  });
