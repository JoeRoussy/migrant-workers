
const config = {
    program: null,
    isLoading: false,
    error: false
};

const programReducer = (state = config, actions) => {
    const {
        type: actionType,
        payload
    } = actions;

    switch (actionType) {
        case 'GET_PROGRAM_BY_ID_PENDING': {
            state = {
                ...state,
                program: null,
                loading: true,
                error: false
            };

            break;
        }
        case 'GET_PROGRAM_BY_ID_FULFILLED': {

            state = {
                ...state,
                loading: false,
                program: payload.data.program
            };

            break;
        }
        case 'GET_PROGRAM_BY_ID_REJECTED': {
            state = {
                ...state,
                loading: false,
                program: null,
                error: true
            };

            break;
        }
    }

    return state;
}

export default programReducer;
