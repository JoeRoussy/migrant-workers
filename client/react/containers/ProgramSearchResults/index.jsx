import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Icon, Card, Grid, Message } from 'semantic-ui-react';
import queryString from 'query-string';
import { Element, scroller } from 'react-scroll';
import { push } from 'react-router-redux';

import { getProgramsByType, setActiveProgram, resetActiveProgram } from '../../../redux/actions/programSearchActions';
import ProgramCard from '../../components/ProgramCard';
import Map from '../../components/Map';
import constants from '../../../../common/constants';

import './styles.css';

const {
    PROGRAM_TYPES
} = constants;

@connect((store)=>({
    programs: store.programSearchReducer.results,
    activeProgram: store.programSearchReducer.activeProgram
}))

class ProgramSearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.onProgramClicked = this.onProgramClicked.bind(this);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);

        const queryParams = queryString.parse(this.props.location.search);
        this.programType = queryParams.type;

        this.programTypeConfigElement = Object.keys(PROGRAM_TYPES).reduce((accumulator, currentKey) => {
            return PROGRAM_TYPES[currentKey].NAME === this.programType
                ? PROGRAM_TYPES[currentKey]
                : accumulator;
        }, null);

        if (! this.programTypeConfigElement) {
            throw `Could not find config element for program type: ${this.programType}`;
        }
    }

    componentWillMount() {
        this.props.dispatch(getProgramsByType(this.programType));
    }

    onProgramClicked(program) {
        this.props.dispatch(resetActiveProgram());
        this.props.dispatch(push(`/programs/${program._id}`));
    }

    onMarkerClicked(program) {
        scroller.scrollTo(String(program._id), {
            offset: -150,
            smooth: 'easeInOutCubic'
        });

        this.props.dispatch(setActiveProgram(program));
    }

    render() {
        const programCards = this.props.programs.map((program) => (
            <ProgramCard 
                program={program}
                key={program._id}
                onClick={() => this.onProgramClicked(program)} 
                isActive={ this.props.activeProgram && this.props.activeProgram._id === program._id }
            />
        ));

        const programIcon = this.programTypeConfigElement.IS_ICON_CUSTOM
            ? <i className={`customIcon massive ${this.programTypeConfigElement.ICON}`}></i>
            : <Icon name={this.programTypeConfigElement.ICON} size='massive' color={this.programTypeConfigElement.COLOR} />;

        const body = programCards.length > 0
            ? (
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <Card.Group centered itemsPerRow={1}>
                            {programCards}
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column>
                        <Map programs={this.props.programs} onMarkerClicked={this.onMarkerClicked} />
                    </Grid.Column>
                </Grid>
            ) : (
                <Message warning icon>
                    <Icon name='warning sign' />
                    <Message.Content>
                        <Message.Header>There are no programs of that type!</Message.Header>
                        <p>If you know of a program that should be listed, please email us at <a href='mailto:migrantfarmworkers.ontario@gmail.com'>migrantfarmworkers.ontario@gmail.com</a></p>
                    </Message.Content>
                </Message>
            );

        return (
            <Container id='programSearchResultsContainer' className='rootContainer'>
                <div className="centered">
                    {programIcon}
                </div>
                <h1>{this.programType}</h1>
                <div className="programCardWrapper">
                    {body}
                </div>
            </Container>
        );
    }
}

export default ProgramSearchResults;
