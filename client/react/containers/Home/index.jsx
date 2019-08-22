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
                                programType={HEALTH.NAME}
                                onClick={() => this.onProgramSearchCardClicked(HEALTH.NAME)}
                                iconName={HEALTH.ICON}
                                color={HEALTH.COLOR}
                            />
                            <ProgramSearchCard
                                programType={FOOD.NAME}
                                onClick={() => this.onProgramSearchCardClicked(FOOD.NAME)}
                                iconName={FOOD.ICON}
                                color={FOOD.COLOR}
                            />
                            <ProgramSearchCard
                                programType={BIKES.NAME}
                                onClick={() => this.onProgramSearchCardClicked(BIKES.NAME)}
                                iconName={BIKES.ICON}
                                color={BIKES.COLOR}
                            />
                            <ProgramSearchCard
                                programType={LEGAL.NAME}
                                onClick={() => this.onProgramSearchCardClicked(LEGAL.NAME)}
                                iconName={LEGAL.ICON}
                                color={LEGAL.COLOR}
                            />
                            <ProgramSearchCard
                                programType={CLOTHES.NAME}
                                onClick={() => this.onProgramSearchCardClicked(CLOTHES.NAME)}
                                iconName={CLOTHES.ICON}
                                color={CLOTHES.COLOR}
                            />
                            <ProgramSearchCard
                                programType={ESL.NAME}
                                onClick={() => this.onProgramSearchCardClicked(ESL.NAME)}
                                iconName={ESL.ICON}
                                color={ESL.COLOR}
                            />
                            <ProgramSearchCard
                                programType={WIFI.NAME}
                                onClick={() => this.onProgramSearchCardClicked(WIFI.NAME)}
                                iconName={WIFI.ICON}
                                color={WIFI.COLOR}
                            />
                            <ProgramSearchCard
                                programType={FINANCIAL_SERVICES.NAME}
                                onClick={() => this.onProgramSearchCardClicked(FINANCIAL_SERVICES.NAME)}
                                iconName={FINANCIAL_SERVICES.ICON}
                                color={FINANCIAL_SERVICES.COLOR}
                            />
                            <ProgramSearchCard
                                programType={CHURCH.NAME}
                                onClick={() => this.onProgramSearchCardClicked(CHURCH.NAME)}
                                iconName={CHURCH.ICON}
                                color={CHURCH.COLOR}
                            />
                            <ProgramSearchCard
                                programType={ONLINE_LINKS.NAME}
                                onClick={() => this.onProgramSearchCardClicked(ONLINE_LINKS.NAME)}
                                iconName={ONLINE_LINKS.ICON}
                                color={ONLINE_LINKS.COLOR}
                            />
                            <ProgramSearchCard
                                programType={WELCOME_SUPPORT.NAME}
                                onClick={() => this.onProgramSearchCardClicked(WELCOME_SUPPORT.NAME)}
                                iconName={WELCOME_SUPPORT.ICON}
                                color={WELCOME_SUPPORT.COLOR}
                            />
                            <ProgramSearchCard
                                programType={EVENTS.NAME}
                                onClick={() => this.onProgramSearchCardClicked(EVENTS.NAME)}
                                iconName={EVENTS.ICON}
                                color={EVENTS.COLOR}
                            />
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home;
