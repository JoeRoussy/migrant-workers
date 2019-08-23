
const config = {
    results: [],
    isLoading: false,
    error: false,
    activeProgram: null
};

const programSearchReducer = (state = config, actions) => {
    const {
        type: actionType,
        payload
    } = actions;

    switch (actionType) {
        case 'GET_PROGRAMS_BY_TYPE_PENDING': {
            state = {
                ...state,
                loading: true,
                error: false
            };

            break;
        }
        case 'GET_PROGRAMS_BY_TYPE_FULFILLED': {

            state = {
                ...state,
                loading: false,
                results: payload.data.programs
            };

            break;
        }
        case 'GET_PROGRAMS_BY_TYPE_REJECTED': {
            state = {
                ...state,
                loading: false,
                results: [],
                error: true
            };

            break;
        }
        case 'SET_ACTIVE_PROGRAM': {
            state = {
                ...state,
                activeProgram: payload
            };

            break;
        }
        case 'RESET_ACTIVE_PROGRAM': {
            state = {
                ...state,
                activeProgram: null
            };

            break;
        }
    }

    return state;
}

export default programSearchReducer;
