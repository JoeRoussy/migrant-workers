import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Card, Message, Link } from 'semantic-ui-react';

import Authenticated from '../../components/Authenticated';
import { navigateTo as getNavigateTo } from '../../../components';

import { getMyPrograms } from '../../../redux/actions/myProgramsActions';

import constants from '../../../../common/constants';

import './styles.css';

const {
    USER_TYPES: {
        ORGANISATION
    } = {}
} = constants;

@connect((store)=>({
    user: store.userReducer.user,
    programs: store.myProgramsReducer.programs,
    error: store.myProgramsReducer.error,
    loading: store.myProgramsReducer.loading
}))
class MyPrograms extends Component {
    constructor(props){
        super(props);

        this.onProgramUploadClicked = this.onProgramUploadClicked.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getMyPrograms());
    }

    onProgramUploadClicked() {
        getNavigateTo(this.props.dispatch)('/upload-program');
    }

    render() {
        const user = this.props.user;
        const loading = this.props.loading;
        const error = this.props.error;
        const programs = this.props.programs;
        const programDisplayItems = programs.map((program) => ({
            header: program.name,
            meta: 'Created At...',
            '__custom': program._id
        }));
        const hasPrograms = programDisplayItems.length > 0;

        const programsDisplaySection = hasPrograms ? (
            <Card.Group centered items={programDisplayItems}></Card.Group>
        ) : (
            <Message warning>
                <Message.Header>You do not have any programs yet</Message.Header>
                <p>Use the button below to make your first program!</p>
            </Message>   
        );

        return (
            <Authenticated test={user && user.type === ORGANISATION}>
                <Container id='myProgramsWrapper' className='rootContainer'>
                    <h1>Your Programs</h1>
                    <div>{loading}</div>
                    <div>{error}</div>
                    <div className='cardWrapper'>{programsDisplaySection}</div>
                    <div className='programUploadWrapper'>
                        <Button color='green' onClick={this.onProgramUploadClicked}>Add Program</Button>
                    </div>
                </Container>
            </Authenticated>
        );
    }
}

export default MyPrograms;
