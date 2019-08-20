import axios from 'axios';
import { toast } from 'react-toastify';

import { navigateTo as getNavigateTo } from '../../components';
import { buildFormSubmissionData } from '../components'

export const submitForm = (formData) => (dispatch) => {
    dispatch({
        type: 'UPLOAD_PROGRAM_FORM_SUBMITTED'
    });

    const submissionData = buildFormSubmissionData(formData, [ 'programs' ]);

    axios.post(`${process.env.API_ROOT}/api/programs`, submissionData)
        .then((res) => {
            toast.success('Programs successfuly uploaded.');

            dispatch({
                type: 'UPLOAD_PROGRAM_FORM_SUBMITTED_FULFILLED',
                payload: res
            });

            // TODO: This should redirect to the program details page (id will be in res.program._id)
            getNavigateTo(dispatch)('/');
        })
        .catch((e) => {
            dispatch({
                type: 'UPLOAD_PROGRAM_FORM_SUBMITTED_REJECTED',
                payload: e
            });
        })
};

export const deletePrograms = () => ({
    type: 'DELETE_PROGRAMS',
    payload: axios.delete(`${process.env.API_ROOT}/api/programs`)
        .then(() => {
            toast.success('Programs successfuly deleted.');
        })
        .catch(() => {
            toast.error('Error deleting programs.');
        })
});
