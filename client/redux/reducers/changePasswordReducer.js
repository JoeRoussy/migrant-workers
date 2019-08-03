const config = {};

import constants from '../../../common/constants';

const {
    ERRORS: {
        PROFILE_EDIT: {
            GENERIC: GENERIC_ERROR,
            INCORRECT_PASSWORD: INCORRECT_PASSWORD_ERROR
        }
    }
} = constants;

const changePasswordReducer = (state = config, actions) => {
    const {
        type,
        payload
    } = actions;

    switch(type) {
        case 'CHANGE_PASSWORD_FORM_SUBMITTED': {
            state = {
                ...state,
                isProcessing: true,
                errorMessage: null
            }

            break;
        }
        case 'CHANGE_PASSWORD_FORM_SUBMITTED_FULFILLED': {
            state = {
                ...state,
                isProcessing: false
            }

            break;
        }
        case 'CHANGE_PASSWORD_FORM_SUBMITTED_REJECTED': {
            const {
                response: {
                    data: {
                        errorKey
                    } = {}
                } = {}
            } = payload;

            let errorMessage;

            if (errorKey) {
                const errorMessages = {
                    [GENERIC_ERROR]: 'Your password could not be updated.',
                    [INCORRECT_PASSWORD_ERROR]: 'Your old password does not match our records.'
                };

                errorMessage = errorMessages[errorKey];
            } else {
                errorMessage = 'Your password could not be updated.';
            }

            state = {
                ...state,
                isProcessing: false,
                errorMessage
            };

            break;
        }
    }

    return state;
}

export default changePasswordReducer;
