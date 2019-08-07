import React from 'react';
import { Button } from 'semantic-ui-react';

import SignUpForm from '../SignupForm';
import './styles.css'

export default ({
    chooseUser,
    onSubmit,
    formValues,
    isFormProcessing,
    errorMessage
}) => (
    <div id='signupFormWrapper'>
        <SignUpForm
            className='signUpForm'
            onSubmit={onSubmit(formValues)}
            isProcessing={isFormProcessing}
            errorMessage={errorMessage}
        />
    </div>
)
