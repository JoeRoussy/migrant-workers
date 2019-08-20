import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Message } from 'semantic-ui-react';

import FileInput from '../FileInput';

import './styles.css';

const validate = (values) => {
    let errors = {};

    const {
        programs
    } = values;

    if (!programs) {
        errors = {
            email: 'Please select a programs CSV to upload',
            ...errors
        };
    }

    return errors;
};

// NOTE: Valid is a prop passed in from redux from.
const ProgramsUploadForm = ({
    onSubmit,
    errorMessage,
    isProcessing,
    valid
}) => (
    <div id="programUploadFormWrapper">
        <Form id="programUploadForm" onSubmit={onSubmit} error={!!errorMessage}>
            <Message
                error
                header='Error'
                content={errorMessage}
            />
            <Field
                name='programs'
                component={FileInput}
                label='Upload a spreadsheet of programs'
                accept='.csv'
                iconName='file outline'
            />
            <Button type='submit' color='green' loading= {isProcessing} disabled={!valid || isProcessing}>Upload Programs</Button>
        </Form>
    </div>
);

export default reduxForm({
    form: 'programs',
    validate
})(ProgramsUploadForm);
