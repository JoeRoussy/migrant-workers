const config = {
    errorMessage: null
};

import constants from '../../../common/constants';

const {
    ERRORS
} = constants;

const signInReducer = (state = config, actions) => {
    const {
        type: actionType,
        payload
    } = actions;

    switch (actionType) {
        case 'SIGN_IN_FORM_SUBMIT': {
            state = {
                ...state,
                isFormProcessing: true,
                errorMessage: null
            };

            break;
        }
        case 'SIGN_IN_FORM_SUBMIT_FULFILLED': {
            state = {
                ...state,
                isFormProcessing: false
            };

            break;
        }
        case 'SIGN_IN_FORM_SUBMIT_REJECTED': {
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
                    [ERRORS.SIGN_IN.MISSING_VALUES]: 'Please make sure you provide a user name and a password',
                    [ERRORS.SIGN_IN.GENERIC]: 'Your request could not be processed',
                    [ERRORS.SIGN_IN.INVALID_CREDENTIALS]: 'Your username or password does not match our records'
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
            }

            break;
        }

    }

    return state;
}

export default signInReducer;
