import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { getProgramById } from '../../../redux/actions/programActions';

import './styles.css';

@connect((store)=>({
    program: store.programReducer.program
}))

class ProgramSearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.programId = this.props.match.params.programId;
    }

    componentWillMount() {
        this.props.dispatch(getProgramById(this.programId));
    }

    render() {
        return (
            <Container id='programDetails' className='rootContainer'>
                <div className="centered">
                    <h1>{this.props.program ? this.props.program.name : ''}</h1>
                </div>
            </Container>
        );
    }
}

export default ProgramSearchResults;