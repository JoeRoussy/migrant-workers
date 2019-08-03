import React from 'react';
import { Container, Grid, Image, Icon } from 'semantic-ui-react';


import './styles.css';


const Footer = () => (
    <Container>
        <div id='footerParent'>
            <Grid centered stackable columns={2} verticalAlign='middle'>
                <Grid.Column textAlign='center'>
                    <div>
                        <Image id='footerLogo' src='/images/logo-white.svg'/>
                    </div>
                </Grid.Column>
                <Grid.Column id='footerContactSection' textAlign='center'>
                    <div className='row'>
                        <span className='heading'>Contact Us</span>
                    </div>
                    <div className='row'>
                        <Icon name='mail'/>
                        <a className='besideIcon' href="mailto:something@email.com">TODO: Email</a>
                    </div>
                    <div className='row'>
                        <Icon name='phone'/>
                        <a className='besideIcon' href="tel:+15555555555">TODO: Phone number</a>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    </Container>
);

export default Footer;