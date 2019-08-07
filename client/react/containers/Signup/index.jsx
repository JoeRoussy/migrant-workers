import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Container } from 'semantic-ui-react';

import SignUpBody from '../../components/SignUpBody';
import { submitForm } from '../../../redux/actions/signupActions';

import './styles.css';

const Signup = ({
    onSubmit,
    formValues,
    isFormProcessing,
    user,
    errorMessage
}) => {
    const userRedirect = user ? (<Redirect to='/'/>) : ('');

    return (
        <Container className='rootContainer'>
            <h1>Sign Up</h1>
            {userRedirect}
            <SignUpBody
                onSubmit={onSubmit}
                formValues={formValues}
                isFormProcessing={isFormProcessing}
                errorMessage={errorMessage}
            />
        </Container>
    );
};

const mapStateToProps = ({
    signUpReducer: {
        isFormProcessing,
        errorMessage
    } = {},
    form: {
        signUp: {
            values
        } = {}
    } = {},
    userReducer: {
        user
    } = {}
}) => ({
    isFormProcessing,
    formValues: values,
    user,
    errorMessage
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (formData, userType) => () => dispatch(submitForm(formData, userType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
