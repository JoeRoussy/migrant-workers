import axios from 'axios';
import { toast } from 'react-toastify';
import {reset} from 'redux-form';

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

            // NOTE: This resets the data in the programs form to prevent double submissions
            dispatch(reset('programs'));
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
