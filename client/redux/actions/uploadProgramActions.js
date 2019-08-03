import axios from 'axios';
import { toast } from 'react-toastify';
import { navigateTo as getNavigateTo } from '../../components';

export const submitForm = (formData) => (dispatch) => {
    dispatch({
        type: 'UPLOAD_PROGRAM_FORM_SUBMITTED'
    });

    // We want to map all the checkboxes to boolen values
    let {
        isIndigenousRan,
        isForWomen,
        requiresApplication,
        customQuestionName,
        customQuestionRequired,
        ...formValues
    } = formData;

    // Reset the default values for custom questions if we are
    // not requiring an application for this program
    if (!requiresApplication) {
        customQuestionName = [];
        customQuestionRequired = [];
    }

    // If the length of the name is longer than the length of the required,
    // then we need to add false values on the end of the required
    // (as those required checkboxes were not touched)
    const customQuestionLengthDifference = customQuestionName.length - customQuestionRequired.length;

    if (customQuestionLengthDifference > 0) {
        for (let i = 0; i < customQuestionLengthDifference; i++) {
            customQuestionRequired.push(false);
        }
    }

    const transformedFormData = {
        isIndigenousRan: !!isIndigenousRan,
        isForWomen: !!isForWomen,
        requiresApplication: !!requiresApplication,
        customQuestionName,
        customQuestionRequired,
        ...formValues
    };

    axios.post(`${process.env.API_ROOT}/api/programs`, transformedFormData)
        .then((res) => {
            toast.success('Your program has been created!');

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

export const moreQuestions = () => ({
    type: 'UPLOAD_PROGRAM_MORE_QUESTIONS_CLICKED'
});

export const removeCustomQuestion = () => ({
    type: 'UPLOAD_PROGRAM_REMOVE_QUESTION' 
})