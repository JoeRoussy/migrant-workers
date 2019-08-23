import axios from 'axios'

export const getProgramById = (id) => ({
    type: 'GET_PROGRAM_BY_ID',
    payload: axios.get(`${process.env.API_ROOT}/api/programs/${id}`)
});