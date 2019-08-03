import { wrap as coroutine } from 'co';
import { required } from '../components/custom-utils';
import { getById } from '../components/db/service';

import constants from '../../common/constants';

const {
    ERRORS: {
        USER: {
            NOT_LOGGED_IN: NOT_LOGGED_IN_ERROR,
            INCORRECT_TYPE: INCORRECT_TYPE_ERROR
        } = {}
    } = {}
} = constants;

export const sendError = ({
    res,
    status,
    message,
    errorKey
}) => res.status(status).json({
    error: true,
    message,
    errorKey
});

// Checks if ANY user is logged in
export const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return sendError({
            res,
            status: 403,
            message: 'You are not authorized to perform this action',
            errorKey: NOT_LOGGED_IN_ERROR
        });
    }

    return next();
}

// Checks if a user is logged in and that they are of a certain type
export const isAuthenticatedAndOfType = (type) => (req, res, next) => {
    isAuthenticated(req, res, () => {
        if (req.user.type !== type) {
            return sendError({
                res,
                status: 403,
                message: 'You are not authorized to perform this action',
                errorKey: INCORRECT_TYPE_ERROR
            });
        }

        return next();
    });
}


export const isEmailVerified = (req, res, next) => {
    if (!req.user.isEmailConfirmed) {
        return sendError({
            res,
            status: 400,
            message: 'You need to confirm your email to perform this action'
        });
    }

    return next();
}

// Makes sure the current user is allowed to modify the user specified in the params of the route
// TODO: Add admin users later?
export const canModifyUser = (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        user: {
            _id: currentUserId
        } = {}
    } = req;

    // NOTE: Both of these ids are actually strings so no use of the equals function for ObjectIDs is needed
    if (id !== currentUserId) {
        return sendError({
            res,
            status: 403,
            message: 'You are not authorized to perform an action on this user'
        });
    }

    return next();
}
