import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Redirect } from 'react-router';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';

import { setCurrentUser} from '../../../redux/actions/userActions';
import { setJwt, navigateTo as getNavigateTo } from '../../../components';
import ProgramSearchCard from '../../components/ProgramSearchCard';

import constants from '../../../../common/constants';

import './styles.css';

@connect((store)=>({
    user: store.userReducer.user,
}))

class Home extends Component {
    constructor(props){
        super(props);

        this.onProgramSearchCardClicked = this.onProgramSearchCardClicked.bind(this);
    }

    onProgramSearchCardClicked(typeName) {
        this.props.dispatch(push(`/programs?type=${typeName}`));
        //this.props.dispatch(push(`/programs`));
    }

    render(){
        const {
            PROGRAM_TYPES: {
                HEALTH,
                BIKES,
                LEGAL,
                CLOTHES,
                FOOD,
                ESL,
                WIFI,
                FINANCIAL_SERVICES,
                CHURCH,
                ONLINE_LINKS,
                WELCOME_SUPPORT,
                EVENTS
            } = {}
        } = constants

        return (
            <div id='home'>
                <div id='homeWrapper' className='section'>
                    <div id='heroOverlay'>
                    </div>
                    <Container id='homeSearchWrapper' className='rootContainer'>
                        <h1 id='homeHeading'>Migrant Worker Site</h1>
                        <div id="programTileWrapper" className='ui cards centered'>
                            <ProgramSearchCard
                                programType={HEALTH}
                                onClick={() => this.onProgramSearchCardClicked(HEALTH)}
                                iconName='plus square'
                                color='red'
                            />

                            <ProgramSearchCard
                                programType={FOOD}
                                onClick={() => this.onProgramSearchCardClicked(FOOD)}
                                iconName='food'
                                color='teal'
                            />
                            
                            <ProgramSearchCard
                                programType={BIKES}
                                onClick={() => this.onProgramSearchCardClicked(BIKES)}
                                iconName='bicycle'
                                color='orange'
                            />
                            <ProgramSearchCard
                                programType={LEGAL}
                                onClick={() => this.onProgramSearchCardClicked(LEGAL)}
                                iconName='balance scale'
                                color='brown'
                            />
                            <ProgramSearchCard
                                programType={CLOTHES}
                                onClick={() => this.onProgramSearchCardClicked(CLOTHES)}
                                iconName='child'
                                color='purple'
                            />
                            <ProgramSearchCard
                                programType={ESL}
                                onClick={() => this.onProgramSearchCardClicked(ESL)}
                                iconName='file text'
                                color='blue'
                            />
                            <ProgramSearchCard
                                programType={WIFI}
                                onClick={() => this.onProgramSearchCardClicked(WIFI)}
                                iconName='wifi'
                                color='violet'
                            />
                            <ProgramSearchCard
                                programType={FINANCIAL_SERVICES}
                                onClick={() => this.onProgramSearchCardClicked(FINANCIAL_SERVICES)}
                                iconName='dollar sign'
                                color='green'
                            />
                            <ProgramSearchCard
                                programType={CHURCH}
                                onClick={() => this.onProgramSearchCardClicked(CHURCH)}
                                iconName='home'
                                color='brown'
                            />
                            <ProgramSearchCard
                                programType={ONLINE_LINKS}
                                onClick={() => this.onProgramSearchCardClicked(ONLINE_LINKS)}
                                iconName='linkify'
                                color='red'
                            />
                            <ProgramSearchCard
                                programType={WELCOME_SUPPORT}
                                onClick={() => this.onProgramSearchCardClicked(WELCOME_SUPPORT)}
                                iconName='handshake'
                                color='olive'
                            />
                            <ProgramSearchCard
                                programType={EVENTS}
                                onClick={() => this.onProgramSearchCardClicked(EVENTS)}
                                iconName='newspaper'
                                color='teal'
                            />
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home;
