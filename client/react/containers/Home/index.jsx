import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Redirect } from 'react-router';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { setPasswordResetToken } from '../../../redux/actions/forgotPasswordFormActions';
import { setCurrentUser} from '../../../redux/actions/userActions';
import { setJwt, navigateTo as getNavigateTo } from '../../../components';

import constants from '../../../../common/constants';

import './styles.css';

const {
    USER_TYPES: {
        ORGANISATION
    } = {}
} = constants;

@connect((store)=>({
    user: store.userReducer.user,
}))

class Home extends Component {
    constructor(props){
        super(props)

        this.onPasswordResetToken = this.onPasswordResetToken.bind(this);
        this.onProgramUploadClicked = this.onProgramUploadClicked.bind(this);
    }

    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);

        if (queryParams.newToken) {
            const currentUser = jwtDecode(queryParams.newToken);

            setJwt(queryParams.newToken);
            this.props.dispatch(setCurrentUser(currentUser));
            toast.success('Your email has been confirmed!');
        }
    }

    onPasswordResetToken(token) {
        this.props.dispatch(setPasswordResetToken(token));
    }

    onProgramUploadClicked() {
        getNavigateTo(this.props.dispatch)('/upload-program');
    }

    render(){
        // TODO: There has to be a better way with server side rendering
        const queryParams = queryString.parse(this.props.location.search);
        let passwordResetRedirect = '';

        if (queryParams.passwordResetToken) {
            passwordResetRedirect = (<Redirect to='/forgot-password-form'/>);
            this.onPasswordResetToken(queryParams.passwordResetToken);
        }

        let uploadProgramSection = null;

        if (this.props.user && this.props.user.type == ORGANISATION) {
            uploadProgramSection = (
                <div className='programUploadWrapper'>
                    <Button color='green' onClick={() => this.onProgramUploadClicked()}>Add Program</Button>
                </div>
            );
        }

        return (
            <div id='home'>
                {passwordResetRedirect}
                <div id='homeWrapper' className='section'>
                    <div id='heroOverlay'>
                    </div>
                    <Container id='homeSearchWrapper' className='rootContainer'>
                        <h1 id='homeHeading'>Connecting Indigenous Resources Canada</h1>
                        {uploadProgramSection}
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home;
