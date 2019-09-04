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

        const phoneNumber = program.contact_number
            ? (<p className='row'><Icon name='phone' size='small' /> {program.contact_number}</p>)
            : '';

        const email = program.contact_email
            ? (<p className='row'><Icon name='mail' size='small' />{program.contact_email}</p>)
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
                            <Icon name='map marker alternate' size='large' /> <span>{program.location} <br/> {program.address}, {program.city} </span>
                        </Header.Content>
                    </Header>
                    {email}
                    {phoneNumber}
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