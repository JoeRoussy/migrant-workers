import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Container, Form, Button, Message, Modal } from 'semantic-ui-react';

import Authenticated from '../../components/Authenticated';
import FileInput from '../../components/FileInput';
import ProgramsUploadForm from '../../components/ProgramsUploadForm'

import {
    submitForm,
    deletePrograms,
    openDeleteModal,
    closeDeleteModal
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
    selectedFile,
    onDeleteProgramsClicked,
    isDeleteModalOpen,
    onDeleteModalClose,
    onOpenDeleteModal
}) => (
    <Authenticated test={!!user}>
        <Container className='rootContainer'>
            <h1>Upload Programs</h1>
            <p id="uploadProgramsWarning">Be sure to delete programs before uploading new CSVs!</p>
            <ProgramsUploadForm
                onSubmit={onSubmit(formData)}
                errorMessage={errorMessage}
                isProcessing={isProcessing}
                selectedFile={selectedFile}
            />
            <div id="deleteProgramWrapper">
                <Button color='red' onClick={onOpenDeleteModal}>Delete All Programs</Button>
            </div>

            <Modal
                open={isDeleteModalOpen}
                onClose={onDeleteModalClose}
            >
                <Modal.Content>
                    <p>Are you sure you want to delete all programs?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={onDeleteModalClose} positive>
                        No
                    </Button>
                    <Button
                        onClick={onDeleteProgramsClicked}
                        negative
                        loading={isProcessing}
                    >
                        Delete Programs
                    </Button>
                </Modal.Actions>
            </Modal>
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
        selectedFile,
        isDeleteModalOpen
    }
}) => ({
    user,
    formData: values,
    isProcessing,
    errorMessage,
    selectedFile,
    isDeleteModalOpen
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (formData) => () => dispatch(submitForm(formData)),
    onDeleteProgramsClicked: () => dispatch(deletePrograms()),
    onDeleteModalClose: () => dispatch(closeDeleteModal()),
    onOpenDeleteModal: () => dispatch(openDeleteModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadPrograms);
