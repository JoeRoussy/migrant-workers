import React from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { Container } from 'semantic-ui-react';

import Authenticated from '../../components/Authenticated';
import UploadProgramForm from '../../components/UploadProgramForm';

import { submitForm, moreQuestions, removeCustomQuestion } from '../../../redux/actions/uploadProgramActions';

import constants from '../../../../common/constants';

const {
    USER_TYPES: {
        ORGANISATION
    } = {}
} = constants;

const UploadProgram = ({
    user,
    formData,
    onSubmit,
    isProcessing,
    errorMessage,
    showFormCustomizationSection,
    customQuestionsCounter,
    onMoreQuestions,
    initialValues,
    removeQuestion
}) => (
    <Authenticated test={user && user.type === ORGANISATION}>
        <Container className='rootContainer'>
            <h1>Upload Program</h1>
            <UploadProgramForm
                onSubmit={onSubmit(formData)}
                isProcessing={isProcessing}
                errorMessage={errorMessage}
                showFormCustomizationSection={showFormCustomizationSection}
                customQuestionsCounter={customQuestionsCounter}
                onMoreQuestions={onMoreQuestions}
                initialValues={initialValues}
                removeQuestion={removeQuestion(formData)}
            />
        </Container>
    </Authenticated>
);

const mapStateToProps = ({
    userReducer: {
        user
    } = {},
    form: {
        uploadProgram: {
            values
        } = {}
    } = {},
    uploadProgramReducer: {
        isProcessing,
        errorMessage,
        customQuestionsCounter
    } = {}
}) => ({
    user,
    formData: values,
    isProcessing,
    errorMessage,
    showFormCustomizationSection: !!(values && values.requiresApplication),
    customQuestionsCounter,
    initialValues: {
        customQuestionName: customQuestionsCounter.map(x => x.name),
        customQuestionRequired:  customQuestionsCounter.map(x => x.isRequired)
    }
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (formData) => () => dispatch(submitForm(formData)),
    onMoreQuestions: () => dispatch(moreQuestions()),
    removeQuestion: (formData) => (index) => {
        const {
            customQuestionName,
            customQuestionRequired
        } = formData;

        customQuestionName.splice(index, 1);
        customQuestionRequired.splice(index, 1);

        // Need to make new references to values so react will update the view
        dispatch(change('uploadProgram', 'customQuestionName', [ ...customQuestionName ]));
        dispatch(change('uploadProgram', 'customQuestionRequired', [ ...customQuestionRequired ]));

        // Need to change the number of questions in the upload program reducer as well
        dispatch(removeCustomQuestion());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(UploadProgram);