const config = {
    customQuestionsCounter: [
        {
            name: 'Name',
            isRequired: true
        },
        {
            name: 'Email',
            isRequired: true
        }
    ]
};

const uploadProgramReducer = (state = config, actions) => {
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
            }

            break;
        }

        case 'UPLOAD_PROGRAM_FORM_SUBMITTED_REJECTED': {
            state = {
                ...state,
                isProcessing: false,
                errorMessage: 'There was an error saving your program'
            };

            break;
        }

        case 'UPLOAD_PROGRAM_MORE_QUESTIONS_CLICKED': {
            state = {
                ...state,
                customQuestionsCounter: [
                    ...state.customQuestionsCounter,
                    {}
                ]
            }

            break;
        }

        case 'UPLOAD_PROGRAM_REMOVE_QUESTION': {
            state.customQuestionsCounter.pop();

            state = {
                ...state,
                customQuestionsCounter: [
                    ...state.customQuestionsCounter
                ]
            }

            break;
        }
    }

    return state;
}

export default uploadProgramReducer;
