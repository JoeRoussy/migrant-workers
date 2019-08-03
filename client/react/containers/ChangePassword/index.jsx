import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import ChangePasswordForm from '../../components/ChangePasswordForm';
import Authenticated from '../../components/Authenticated';
import { navigateTo as getNavigateTo } from '../../../components';
import { submitForm } from '../../../redux/actions/changePasswordActions';

import './styles.css';

const ChangePassword = ({
    onSubmit,
    formData,
    errorMessage,
    navigateTo,
    user,
    isProcessing
}) => (
    <Authenticated test={!!user}>
        <Container className='rootContainer'>
            <h1>Change Password</h1>
            <ChangePasswordForm
                onSubmit={onSubmit(formData)}
                isProcessing={isProcessing}
                errorMessage={errorMessage}
                navigateTo={navigateTo}
                initialValues={{ _id: user ? user._id : null }}
            />
        </Container>    
    </Authenticated>
);

const mapStateToProps = ({
    changePasswordReducer: {
        errorMessage,
        isProcessing
    } = {},
    userReducer: {
        user
    } = {},
    form: {
        changePassword: {
            values
        } = {}
    } = {}
}) => ({
    errorMessage,
    user,
    formData: values,
    isProcessing
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (formData) => () => dispatch(submitForm(formData)),
    navigateTo: getNavigateTo(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
