import React from 'react';
import { Card } from 'semantic-ui-react';
import { Element } from 'react-scroll';

import './styles.css';

const ProgramCard = ({
    program,
    onClick,
    isActive
}) => (
    <Card onClick={onClick} className={isActive ? 'active' : ''}>
        <Element name={String(program._id)} />
        <Card.Content>
            <Card.Header>{program.name}</Card.Header>
            <Card.Meta>{program.organizationName}</Card.Meta>
            <Card.Meta>{program.city}</Card.Meta>
            <Card.Description>{program.summary}</Card.Description>
        </Card.Content>
    </Card>
);

export default ProgramCard;
