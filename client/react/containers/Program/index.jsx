import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Button, Icon } from 'semantic-ui-react';

import { getProgramById } from '../../../redux/actions/programActions';
import Map from '../../components/Map';

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
        const program = this.props.program || {};

        const link = program.link
            ? <Button primary as='a' href={program.link} target="_blank">More Information</Button>
            : '';

        return (
            <Container id='programDetails' className='rootContainer'>
                <div className="centered">
                    <Header as='h1'>
                        <Header.Content>
                            {program.name}
                        </Header.Content>
                    </Header>
                    <Header as='h2'>
                        <Header.Content>
                            <Icon name='map marker alternate' size='large' /> {program.location}
                        </Header.Content>
                    </Header>
                    <p className='row descriptions'>{program.description}</p>
                    <div className='row buttonWrapper'>
                        {link}
                    </div>
                    <div className='row mapWrapper'>
                        <Map programs={[ program ]} defaultZoom={15}/>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ProgramSearchResults;