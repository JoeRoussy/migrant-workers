/* This module just collects all the reducers in our app and combines them */

import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import userReducer from './userReducer';
import signUpReducer from './signupReducer';
import signInReducer from './signInReducer';
import uploadProgramsReducer from './uploadProgramsReducer';
import programSearchReducer from './programSearchReducer';
import programReducer from './programReducer'

const reducers = combineReducers({
    userReducer,
    form: formReducer,
    signUpReducer,
    signInReducer,
    uploadProgramsReducer,
    programSearchReducer,
    programReducer
});

export default reducers;
