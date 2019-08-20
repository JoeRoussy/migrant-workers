import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProgramsByType } from '../../../redux/actions/programSearchActions';
import ProgramCard from '../../components/ProgramCard';

import './styles.css';

export default class ProgramSearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.programType = this.props.match.params.programType;
    }

    componentWillMount() {
        this.props.dispatch(getProgramsByType(this.programType));
    }

    render() {
        const programCards = this.programs.map((program) => (
            <ProgramCard program={program} />
        ));

        return (
            <Container id='programSearchResultsContainer' className='rootContainer'>
                <div class="programCardWrapper">
                    {programCards}
                </div>
            </Container>
        );
    }
}