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
        } = constants;

        const programCards = [
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
        ].map((CARD_CONFIG, i) => (
            <ProgramSearchCard
                programType={CARD_CONFIG.NAME}
                onClick={() => this.onProgramSearchCardClicked(CARD_CONFIG.NAME)}
                iconName={CARD_CONFIG.ICON}
                color={CARD_CONFIG.COLOR}
                isCustom={CARD_CONFIG.IS_ICON_CUSTOM || false}
                key={i}
            />
        ))

        return (
            <div id='home'>
                <div id='homeWrapper' className='section'>
                    <div id='heroOverlay'>
                    </div>
                    <Container id='homeSearchWrapper' className='rootContainer'>
                        <h1 id='homeHeading'>Resources for Migrant Farmworkers - Ontario</h1>
                        <div className="siteDescription centered">
                            <p>Migrant farmworkers are important for Canadian farms. We know that it is not easy to do farm work, to leave your families, and to live in Canada.</p>
                            <p>Through this website, we want to help you find the resources, people, and agencies that will make your time in Canada easier.</p>
                            <p>If you know of any other resources not listed here, please email us at: <a href="mailto:migrantfarmworkers.ontario@gmail.com">migrantfarmworkers.ontario@gmail.com</a></p>
                        </div>
                        <div id="programTileWrapper" className='ui cards centered'>
                            {programCards}
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home;
