
const config = {
    programs: [],
    loading: false,
    error: false
};

const myProgramsReducer = (state = config, actions) => {
    const {
        type: actionType,
        payload
    } = actions;

    switch (actionType) {
        case 'GET_MY_PROGRAMS_PENDING': {
            state = {
                ...state,
                loading: true,
                error: false
            };

            break;
        }
        case 'GET_MY_PROGRAMS_FULFILLED': {

            state = {
                ...state,
                loading: false,
                programs: payload.data.programs
            };

            break;
        }
        case 'GET_MY_PROGRAMS_REJECTED': {
            state = {
                ...state,
                loading: false,
                programs: [],
                error: true
            };

            break;
        }
    }

    return state;
}

export default myProgramsReducer;
