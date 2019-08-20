import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

import './styles.css';

const ProgramSearchCard = ({
    programType,
    iconName,
    onClick,
    color
}) => (
    <Card className='programSearchCard' onClick={onClick} color={color}>
        <div className='cardIconWrapper'>
            <Icon name={iconName} size='massive' />
        </div>
        <Card.Content>
            <Card.Header>{programType}</Card.Header>
        </Card.Content>
    </Card>
);

export default ProgramSearchCard;

