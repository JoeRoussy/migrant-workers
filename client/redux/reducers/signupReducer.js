import { LOCATION_CHANGE } from 'react-router-redux';
import constants from '../../../common/constants';

const config = {

};

const {
    ERRORS: {
        SIGN_UP: {
            EXISTING_EMAIL: EXISTING_EMAIL_ERROR,
            GENERIC: GENERIC_EMAIL_ERROR,
            MISSING_VALUES: MISSING_VALUES_ERROR
        } = {}
    } = {}
} = constants;

const signUpReducer = (state = config, actions) => {
    const {
        type: actionType,
        payload
    } = actions;

    switch (actionType) {
        case 'USER_TYPE_CHOSEN': {
            const {
                type
            } = payload;

            state = {
                ...state,
                userType: type
            }

            break;
        }
        case 'SIGN_UP_FORM_SUBMIT': {
            state = {
                ...state,
                isFormProcessing: true,
                errorMessage: null
            }

            break;
        }
        case 'SIGN_UP_FORM_SUBMIT_FULFILLED': {
            state = {
                ...state,
                isFormProcessing: false
            };

            break;
        }
        case 'SIGN_UP_FORM_SUBMIT_REJECTED': {
            const {
                response: {
                    data: {
                        errorKey
                    } = {}
                } = {}
            } = payload;

            let errorMessage;

            if (errorKey) {
                // We got an error key back so use an error message that relates to it
                const errorMessages = {
                    [EXISTING_EMAIL_ERROR]: 'A user with that email already exists',
                    [GENERIC_EMAIL_ERROR]: 'Your request could not be processed',
                    [MISSING_VALUES_ERROR]: 'Please ensure you have filled all the fields in the form'
                };

                errorMessage = errorMessages[errorKey];

            } else {
                // We did not get an error key back so use a generic error
                errorMessage = 'Your request could not be processed'
            }

            state = {
                ...state,
                isFormProcessing: false,
                errorMessage
            };

            break;
        }
        case LOCATION_CHANGE: {
            // Clear the user type when we enter the sign in route
            const {
                pathname
            } = payload;

            if (pathname === '/sign-up') {
                state = {
                    ...state,
                    userType: null
                };
            }

            break;
        }
    }


    return state;
}

export default signUpReducer;
