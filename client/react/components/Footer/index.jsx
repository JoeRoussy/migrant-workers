import React from 'react';
import { Container, Grid, Image, Icon } from 'semantic-ui-react';


import './styles.css';


const Footer = () => (
    <Container>
        <div id='footerParent'>
            <Grid centered stackable columns={2} verticalAlign='middle'>
                <Grid.Column textAlign='center'>
                    <div id='footerTitle'>
                        Resources for Migrant Farmworkers - Ontario
                    </div>
                </Grid.Column>
                <Grid.Column id='footerContactSection' textAlign='center'>
                    <div className='row'>
                        <span className='heading'>Contact Us</span>
                    </div>
                    <div className='row'>
                        <Icon name='mail'/>
                        <a className='besideIcon' href="mailto:migrantfarmworkers.ontario@gmail.com">migrantfarmworkers.ontario@gmail.com</a>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    </Container>
);

export default Footer;