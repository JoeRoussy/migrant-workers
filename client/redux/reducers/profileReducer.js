const config = {
    isEditing: false
};

const profileReducer = (state = config, actions) => {
    const {
        type,
        payload
    } = actions;

    switch (type) {
        case 'EDIT_PROFILE_SELECTED': {
            state = {
                ...state,
                isEditing: true
            }

            break;
        }
        case 'EDIT_PROFILE_CANCELLED': {
            state = {
                ...state,
                isEditing: false
            }

            break;
        }
        case 'EDIT_PROFILE_PICTURE_SELECTED': {
            state = {
                ...state,
                isEditingPicture: true
            }

            break;
        }
        case 'EDIT_PROFILE_PICTURE_CANCELLED': {
            state = {
                ...state,
                isEditingPicture: false,
                selectedImage: null
            }

            break;
        }
        case 'PROFILE_FORM_SUBMIT': {
            state = {
                ...state,
                isFormProcessing: true,
                errorMessage: null
            };

            break;
        }
        case 'PROFILE_FORM_SUBMIT_FULFILLED': {
            state = {
                ...state,
                isFormProcessing: false,
                isEditing: false
            };

            break;
        }
        case 'PROFILE_FORM_SUBMIT_REJECTED': {
            const errorMessage = 'Your profile could not be updated.';

            state = {
                ...state,
                isFormProcessing: false,
                isEditing: false,
                errorMessage
            };

            break;
        }
        case 'DELETE_PROFILE_SELECTED': {
            state = {
                ...state,
                isDeleting: true
            };

            break;
        }
        case 'DELETE_PROFILE_CANCELED': {
            state = {
                ...state,
                isDeleting: false
            };

            break;
        }
        case 'DELETE_PROFILE_CONFIRMED_PENDING': {
            state = {
                ...state,
                isDeletePending: true
            };

            break;
        }
        case 'DELETE_PROFILE_CONFIRMED_FULFILLED': {
            state = {
                ...state,
                isDeletePending: false,
                isDeleting: false
            };

            break;
        }
        case 'DELETE_PROFILE_CONFIRMED_REJECTED': {
            state = {
                ...state,
                isDeletePending: false,
                isDeleting: false
            };

            break;
        }
        case 'PROFILE_PICTURE_SELECTED': {
            state = {
                ...state,
                selectedImage: payload
            }

            break;
        }
    }

    return state;
}

export default profileReducer;
