import axios from 'axios';

export const getMyPrograms = () => ({
    type: 'GET_MY_PROGRAMS',
    payload: axios.get(`${process.env.API_ROOT}/api/programs/me`)
});