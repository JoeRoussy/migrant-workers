import React from 'react';
import { Card } from 'semantic-ui-react';

import './styles.css';

const ProgramCard = ({
    program,
    onClick
}) => (
    <Card onClick={onClick}>
        <Card.Content>
            <Card.Header>{program.name}</Card.Header>
            <Card.Meta>{program.organizationName}</Card.Meta>
            <Card.Meta>{program.location}</Card.Meta>
            <Card.Description>{program.summary}</Card.Description>
        </Card.Content>
    </Card>
);

export default ProgramCard;