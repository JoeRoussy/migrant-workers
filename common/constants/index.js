const constants = {
    USER_TYPES: {
        CLIENT: 'client',
        ORGANISATION: 'organisation'
    },
    ERRORS: {
        SIGN_UP: {
            EXISTING_EMAIL: 'errors_sign_up_existing_email',
            GENERIC: 'errors_sign_up_generic',
            MISSING_VALUES: 'errors_sign_up_missing_values',
            INVALID_VALUES: 'errors_sign_up_invalid_values'
        },
        SIGN_IN: {
            'MISSING_VALUES': 'errors_sign_in_missing_values',
            'GENERIC': 'errors_sign_in_generic',
            'INVALID_CREDENTIALS': 'errors_sign_up_invalid_credentials'
        },
        PROFILE_EDIT: {
            GENERIC: 'profile_edit_errors_generic',
            INCORRECT_PASSWORD: 'profile_edit_errors_incorrect_password'
        },
        PASSWORD_RESET: {
            INVALID_TOKEN: 'password_reset_errors_invalid_token',
            GENERIC: 'password_reset_errors_generic',
            NO_USER_FOR_EMAIL: 'password_reset_errors_no_user_for_email'
        },
        IMAGE_PROCESSING: {
            GENERIC: 'image_processing_generic_error'
        },
        USER: {
            NOT_LOGGED_IN: 'user_error_not_logged_in',
            INCORRECT_TYPE: 'user_error_incorrect_type'
        },
        PROGRAM_CREATE: {
            MISSING_CUSTOM_QUESTION_NAMES: 'program_create_missing_custom_question_names',
            UNEQUAL_QUESTION_ARRAY_LENGTHS: 'program_create_unequal_question_array_lengths',
            GENERIC: 'program_create_generic_error'
        },
        PROGRAM_FETCH: {
            GENERIC: 'program_fetch_generic_error'
        }
    },
    VERIFICATION_TYPES: {
        EMAIL: 'email'
    },
    EMAIL: {
        TEMPLATE_EXTENSION: '.hbs',
        TEMPLATE_PATH: 'app/components/mail-sender/templates',
        TEMPLATE_LAYOUT_PATH: 'app/components/mail-sender/templates/layouts',
        DEFAULT_LAYOUT: 'main',
        TEMPLATE_PARTIALS: 'app/components/mail-sender/templates/partials'
    },
    REDUX_FORM_CHANGE_ACTION_TYPE: '@@redux-form/CHANGE',
    PASSWORD_RESET: {
        MAX_REQUEST_DAYS: 30
    },
    AUTH: {
        SALT_ROUNDS: 12
    }
};

export default constants;