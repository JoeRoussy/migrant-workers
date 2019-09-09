const config = {
    isProcessing: false,
    errorMessage: null,
    selectedFile: null,
    isDeleteModalOpen: false
};

const uploadProgramsReducer = (state = config, actions) => {
    const {
        type,
        payload
    } = actions;

    switch (type) {

        case 'UPLOAD_PROGRAM_FORM_SUBMITTED': {
            state = {
                ...state,
                isProcessing: true,
                errorMessage: null
            };

            break;
        }

        case 'UPLOAD_PROGRAM_FORM_SUBMITTED_FULFILLED': {
            state = {
                ...state,
                isProcessing: false
            };

            break;
        }

        case 'UPLOAD_PROGRAM_FORM_SUBMITTED_REJECTED': {
            state = {
                ...state,
                isProcessing: false,
                errorMessage: 'There was an error uploading programs.'
            };

            break;
        }

        case 'PROGRAMS_FILE_SELECTED': {
            state = {
                ...state,
                selectedFile: payload
            };

            break;
        }

        case 'DELETE_PROGRAMS_PENDING': {
            state = {
                ...state,
                isProcessing: true
            };

            break;
        }

        case 'DELETE_PROGRAMS_FULFILLED': {
            state = {
                ...state,
                isProcessing: false,
                isDeleteModalOpen: false
            };

            break;
        }

        case 'DELETE_PROGRAMS_REJECTED': {
            state = {
                ...state,
                isProcessing: false,
                isDeleteModalOpen: false
            };

            break;
        }

        case 'OPEN_DELETE_PROGRAMS_CONFIRMATION_MODAL': {
            state = {
                ...state,
                isDeleteModalOpen: true
            };

            break;
        }

        case 'CLOSE_DELETE_PROGRAMS_CONFIRMATION_MODAL': {
            state = {
                ...state,
                isDeleteModalOpen: false
            };

            break;
        }
    }

    return state;
}

export default uploadProgramsReducer;
