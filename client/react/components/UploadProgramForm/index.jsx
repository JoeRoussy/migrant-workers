import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Message, Divider } from 'semantic-ui-react';
import { InputField, Checkbox } from 'react-semantic-redux-form';

import './styles.css';

const validate = (values) => {
    let errors = {};

    const {
        name,
        address
    } = values;

    if (!name) {
        errors = {
            name: 'Please enter a name for the program',
            ...errors
        };
    }

    if (!address) {
        errors = {
            address: 'Please enter an address for the program',
            ...errors
        };
    }

    return errors;
};

const UploadProgramForm = ({
    onSubmit,
    isProcessing,
    valid,
    errorMessage,
    showFormCustomizationSection,
    customQuestionsCounter,
    onMoreQuestions,
    removeQuestion
}) => {
    const formCustomizationSection = showFormCustomizationSection ? (
        <div className='formCustomizationWrapper'>
            <h2>Custom Program Application Form</h2>
            <p className="customQuestionsInfo">Enter required form fields below for an application to this program and we will send applications to the email provided below.</p>
            <Field
                className='applicationDestinationWrapper'
                name='applicationSubmissionEmail'
                component={InputField}
                label='Email To Recieve Applications:'
                labelPosition='left'
                placeholder='Email'
            />
            {customQuestionsCounter.map((x, index) => (
                <div className='customQuestionWrapper' key={index}>
                    <Divider />
                    <div className='questionName'>
                        <Field
                            name={`customQuestionName[${index}]`}
                            component={InputField}
                            label='Field Name'
                            labelPosition='left'
                            placeholder='Name'
                        />
                    </div>
                    <div className='questionCheckbox'>
                        <Field
                            name={`customQuestionRequired[${index}]`}
                            component={Checkbox}
                            label='Required'
                        />
                    </div>
                    <div className="deleteButtonWrapper">
                        <Button type='button' color='red' onClick={() => removeQuestion(index)} disabled={customQuestionsCounter.length <= 1}>Remove</Button>
                    </div>
                </div>
                
            )) }
            <div className='addQuestionButtonWrapper'>
                <Button type='button' color='green' onClick={onMoreQuestions}>Add another field</Button>
            </div>
        </div>
    ) : '';


    return (
        <div id='uploadProgramForm'>
            <Form id='profileEditForm' onSubmit={onSubmit} error={!!errorMessage}>
                <Message
                    error
                    header='Error'
                    content={errorMessage}
                />
                <Field
                    name='name'
                    component={InputField}
                    label='Program Name'
                    labelPosition='left'
                    placeholder='Name'
                />
                <Field
                    name='address'
                    component={InputField}
                    label='Program Address'
                    labelPosition='left'
                    placeholder='Name'
                />
                <Field
                    className='formElement'
                    name='isIndigenousRan'
                    component={Checkbox}
                    label='The program has Indigenous leadership'
                />
                <Field
                    className='formElement'
                    name='isForWomen'
                    component={Checkbox}
                    label='This program is geared towards Women'
                />
                <Field
                    className='formElement'
                    name='requiresApplication'
                    component={Checkbox}
                    label='This program requires an applicaion. (You can configure the application form if this is the case)'
                />
                {formCustomizationSection}
                <Button type='submit' color='green' loading={isProcessing} disabled={!valid || isProcessing}>Save Program</Button>
            </Form>
        </div>
    );
}

export default reduxForm({
    form: 'uploadProgram',
    validate
})(UploadProgramForm);