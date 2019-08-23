import axios from 'axios';

export const getProgramsByType = (type) => ({
    type: 'GET_PROGRAMS_BY_TYPE',
    payload: axios.get(`${process.env.API_ROOT}/api/programs?type=${type}`)
});

export const setActiveProgram = (program) => ({
    type: 'SET_ACTIVE_PROGRAM',
    payload: program
});

export const resetActiveProgram = () => ({
    type: 'RESET_ACTIVE_PROGRAM'
})