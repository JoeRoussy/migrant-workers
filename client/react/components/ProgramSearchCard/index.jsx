import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

import './styles.css';

const ProgramSearchCard = ({
    programType,
    iconName,
    onClick,
    color,
    isCustom
}) => (
    <Card className='programSearchCard' onClick={onClick} color={color}>
        <div className='cardIconWrapper'>
            {isCustom ? <i className={`customIcon ${iconName}`}></i> : <Icon name={iconName} size='massive' color={color} /> }
        </div>
        <Card.Content>
            <Card.Header>{programType}</Card.Header>
        </Card.Content>
    </Card>
);

export default ProgramSearchCard;

