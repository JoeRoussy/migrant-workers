import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Redirect } from 'react-router';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { setCurrentUser} from '../../../redux/actions/userActions';
import { setJwt, navigateTo as getNavigateTo } from '../../../components';

import constants from '../../../../common/constants';

import './styles.css';

@connect((store)=>({
    user: store.userReducer.user,
}))

class Home extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div id='home'>
                <div id='homeWrapper' className='section'>
                    <div id='heroOverlay'>
                    </div>
                    <Container id='homeSearchWrapper' className='rootContainer'>
                        <h1 id='homeHeading'>Connecting Indigenous Resources Canada</h1>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home;
