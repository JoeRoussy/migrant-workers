import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import queryString from 'query-string';

import { getProgramsByType } from '../../../redux/actions/programSearchActions';
import ProgramCard from '../../components/ProgramCard';

import './styles.css';

@connect((store)=>({
    programs: store.programSearchReducer.results,
}))

class ProgramSearchResults extends React.Component {
    constructor(props) {
        super(props);

        const queryParams = queryString.parse(this.props.location.search);
        this.programType = queryParams.type;
    }

    componentWillMount() {
        this.props.dispatch(getProgramsByType(this.programType));
    }

    render() {
        const programCards = this.props.programs.map((program) => (
            <ProgramCard program={program} key={program._id} />
        ));

        return (
            <Container id='programSearchResultsContainer' className='rootContainer'>
                <div className="programCardWrapper">
                    {programCards}
                </div>
            </Container>
        );
    }
}

export default ProgramSearchResults;