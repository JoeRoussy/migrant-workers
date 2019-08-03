import React from 'react';
import { Redirect } from 'react-router';

const Authenticated = ({
    children,
    test,
    redirect = '/sign-in'
}) => {
    let toRender = children;

    if (!test) {
        toRender = <Redirect to={redirect} />;
    }

    return toRender;
}

export default Authenticated;