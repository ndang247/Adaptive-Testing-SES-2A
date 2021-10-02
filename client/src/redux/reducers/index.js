import { combineReducers } from 'redux';
import auth from './auth';
import question from './question';
import examroom from './examroom';

export const reducers = combineReducers({ auth, question, examroom });
