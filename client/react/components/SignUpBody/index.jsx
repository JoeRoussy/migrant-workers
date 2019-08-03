import React from 'react';
import { Button } from 'semantic-ui-react';


import constants from '../../../../common/constants';
import SignUpForm from '../SignupForm';
import './styles.css'

const {
    USER_TYPES
} = constants;

export default ({
    userType,
    chooseUser,
    onSubmit,
    formValues,
    isFormProcessing,
    errorMessage
}) => {
    if (userType) {
        const chooseUserButton = userType === USER_TYPES.CLIENT ? (
            <Button color='blue' onClick={() => chooseUser(USER_TYPES.ORGANISATION)}>Sign up as an organisation</Button>
        ) : (
            <div>
                <span className="infoText">Looking for resources?</span>
                <Button color='blue' onClick={() => chooseUser(USER_TYPES.CLIENT)}>Sign up as an individual</Button>
            </div>
        );

        return (
            <div id='signupFormWrapper'>
                <div className='rightAligned'>
                    {chooseUserButton}
                </div>
                <SignUpForm
                    userType={userType}
                    className='signUpForm'
                    onSubmit={onSubmit(formValues, userType)}
                    isProcessing={isFormProcessing}
                    errorMessage={errorMessage}
                />
            </div>
        )
    }

    return (
        <div id='signUpBody'>
            <div className='ui two buttons'>
                <Button basic color='green' onClick={() => chooseUser(USER_TYPES.CLIENT)}>Sign up as an individual</Button>
                <Button basic color='green' onClick={() => chooseUser(USER_TYPES.ORGANISATION)}>Sign up as an organisation</Button>
            </div>
        </div>
    );
}
