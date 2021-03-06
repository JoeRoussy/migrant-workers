import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Message, Grid, Image } from 'semantic-ui-react';
import { InputField } from 'react-semantic-redux-form';

import FileInput from '../FileInput';

import './styles.css';

const validate = (values) => {
    let errors = {};

    const {
        email,
        name
    } = values;

    if (!email) {
        errors = {
            email: 'Please update your email',
            ...errors
        };
    }

    if (!name) {
        errors = {
            name: 'Please update your name',
            ...errors
        };
    }

    return errors;
};

// NOTE: Valid is a prop passed in from redux from.
const ProfileForm = ({
    valid,
    onSubmit,
    errorMessage,
    isProcessing,
    onEditCancelClicked,
    profilePictureLink,
    isEditingPicture,
    onPictureEditClicked,
    onCancelPictureEditClicked,
    navigateTo,
    selectedImage,
    onProfileImageChange
}) => {
    const profilePictureEditSection = isEditingPicture ? (
        <Grid.Column>
            <Field
                name='profilePic'
                component={FileInput}
                label='Upload a profile picture'
                accept='image/x-png,image/jpeg'
                iconName='image'
                onChange={onProfileImageChange}
            />
            {selectedImage ? (
                <div className='imagePreviewWrapper'>
                    <div className='title'>New Profile Picutre Preview</div>
                    <img src={selectedImage}></img>
                </div>
            ) : ''}
        <Button className='primaryColour' type='button' id='profileKeepOldPictureButton' onClick={onCancelPictureEditClicked}>Keep Old Profile Picture</Button>
        </Grid.Column>
    ) : (
        <Grid.Column>
            <Button className='primaryColour' type='button' onClick={onPictureEditClicked}>Upload New Profile Picture</Button>
        </Grid.Column>

    );

    return (
        <div id='profileEditFormWrapper'>
            <Button className='primaryColour' onClick={onEditCancelClicked}>Back to Profile</Button>
            <Form id='profileEditForm' onSubmit={onSubmit} error={!!errorMessage}>
                <Message
                    error
                    header='Error'
                    content={errorMessage}
                />
                <Field
                    name='name'
                    component={InputField}
                    label='Name'
                    labelPosition='left'
                    placeholder='Name'
                />
                <Button className='primaryColour' type='button' onClick={() => navigateTo('/change-password')}>Change Password</Button>
                <div id='currentProfilePictureWrapper'>
                    <div className="title">Profile Picutre</div>
                    <Image className='profilePicture' src={`${process.env.ASSETS_ROOT}${profilePictureLink}`} />
                </div>
                <div id='profilePictureEditSection'>
                    {profilePictureEditSection}
                </div>
                <Button type='submit' color='green' loading={isProcessing} disabled={!valid || isProcessing}>Update Profile</Button>
            </Form>
        </div>
    )
};

export default reduxForm({
    form: 'profile',
    validate
})(ProfileForm);
