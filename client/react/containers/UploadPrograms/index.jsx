import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import Authenticated from '../../components/Authenticated';

import './styles.css';

const UploadPrograms = ({
    user
}) => (
    <Authenticated test={!!user}>
        <Container className='rootContainer'>
             <h1>Upload Programs</h1>
             <p className="centered">UPLOADING NEW PROGRAMS WILL REPLACE ANY EXISTING PROGRAMS.</p>

        </Container>    
    </Authenticated>
);

const mapStateToProps = ({
    userReducer: {
        user
    } = {}
}) => ({
    user
});

const mapDispatchToProps = ({

}) => ({
    
})

export default connect(mapStateToProps, null)(UploadPrograms);
