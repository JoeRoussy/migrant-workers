import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Container, Form, Button, Message } from 'semantic-ui-react';

import Authenticated from '../../components/Authenticated';
import FileInput from '../../components/FileInput';
import ProgramsUploadForm from '../../components/ProgramsUploadForm'

import {
    submitForm
} from '../../../redux/actions/uploadProgramsActions';

import './styles.css';

const UploadPrograms = ({
    formData,
    user,
    onSubmit,
    errorMessage,
    isProcessing,
    valid,
    onProgramFileChange,
    selectedFile
}) => (
    <Authenticated test={!!user}>
        <Container className='rootContainer'>
            <h1>Upload Programs</h1>
            <p className="centered">UPLOADING NEW PROGRAMS WILL REPLACE ANY EXISTING PROGRAMS.</p>
            <ProgramsUploadForm
                onSubmit={onSubmit(formData)}
                errorMessage={errorMessage}
                isProcessing={isProcessing}
                selectedFile={selectedFile}
            />
        </Container>
    </Authenticated>
);

const mapStateToProps = ({
    userReducer: {
        user
    } = {},
    form: {
        programs: {
            values
        } = {}
    } = {},
    uploadProgramsReducer: {
        isProcessing,
        errorMessage,
        selectedFile
    }
}) => ({
    user,
    formData: values,
    isProcessing,
    errorMessage,
    selectedFile
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (formData) => () => dispatch(submitForm(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadPrograms);
