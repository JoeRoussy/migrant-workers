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
        this.props.dispatch(push(`/programs/?type=${typeName}`));
    }

    render(){
        return (
            <div id='home'>
                <div id='homeWrapper' className='section'>
                    <div id='heroOverlay'>
                    </div>
                    <Container id='homeSearchWrapper' className='rootContainer'>
                        <h1 id='homeHeading'>Migrant Worker Site</h1>
                        <div id="programTileWrapper" className='ui cards centered'>
                            <ProgramSearchCard
                                programType='food'
                                onClick={() => this.onProgramSearchCardClicked('food')}
                                iconName='food'
                                color='blue'
                            />
                            <ProgramSearchCard
                                programType='health'
                                onClick={() => this.onProgramSearchCardClicked('health')}
                                iconName='doctor'
                                color='red'
                            />
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home;
