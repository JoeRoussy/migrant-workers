/* This module just collects all the reducers in our app and combines them */

import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import userReducer from './userReducer';
import signUpReducer from './signupReducer';
import signInReducer from './signInReducer';
import uploadProgramReducer from './uploadProgramReducer';
import myProgramsReducer from './myProgramsReducer';

const reducers = combineReducers({
    userReducer,
    form: formReducer,
    signUpReducer,
    signInReducer,
    uploadProgramReducer,
    myProgramsReducer
});

export default reducers;
