const config = {
    email: null
};

import constants from '../../../common/constants';

const {
    ERRORS: {
        PASSWORD_RESET: {
            NO_USER_FOR_EMAIL: NO_USER_FOR_EMAIL_ERROR
        } = {}
    } = {}
} = constants;

const forgotPasswordReducer = (state = config, actions) => {
    const {
        type,
        payload
    } = actions;

    switch (type) {
        case 'PASSWORD_RESET_EMAIL_FORM_SUBMITTED_PENDING': {
            state = {
                ...state,
                isProcessing: true,
                errorMessage: null
            };

            break;
        }
        case 'PASSWORD_RESET_EMAIL_FORM_SUBMITTED_FULFILLED': {
            const {
                data: {
                    email
                } = {}
            } = payload;

            state = {
                ...state,
                isProcessing: false,
                email
            };

            break;
        }
        case 'PASSWORD_RESET_EMAIL_FORM_SUBMITTED_REJECTED': {
            const {
                response: {
                    data: {
                        errorKey
                    } = {}
                } = {}
            } = payload;

            let errorMessage = 'There was an error processing your request.';

            if (errorKey === NO_USER_FOR_EMAIL_ERROR) {
                errorMessage = 'We could not find an account associated with that email.'
            }

            state = {
                ...state,
                isProcessing: false,
                errorMessage
            };

            break;
        }
        case 'PASSWORD_RESET_EMAIL_DELETE': {
            state = {
                ...state,
                email: null
            };

            break;
        }
    }

    return state;
}

export default forgotPasswordReducer;
