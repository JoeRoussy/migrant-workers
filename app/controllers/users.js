import { wrap as coroutine } from 'co';
import jwt from 'jsonwebtoken';

import { required, print, isEmpty, extendIfPopulated, convertToObjectId } from '../components/custom-utils';
import { generateHash as generatePasswordHash, comparePasswords } from '../components/authentication';
import { transformUserForOutput } from '../components/transformers';
import { sendError } from './utils';
import {
    getUserByEmail,
    getEmailConfirmationLink,
    removeUserById,
    findRoommateSurveyResponse,
    findRecommendedRoommates,
    findUsersByName
} from '../components/data';
import {
    insert as insertInDb,
    getById,
    findAndUpdate,
    deleteById
} from '../components/db/service';

import constants from '../../common/constants';

const {
    ERRORS: {
        SIGN_UP: {
            EXISTING_EMAIL: EXISTING_EMAIL_ERROR,
            GENERIC: GENERIC_SIGN_UP_ERROR,
            MISSING_VALUES: MISSING_VALUES_SIGN_UP_ERROR,
            INVALID_VALUES: INVALID_VALUES_SIGN_UP_ERROR
        } = {},
        PROFILE_EDIT: {
            GENERIC: GENERIC_PROFILE_EDIT_ERROR,
            INCORRECT_PASSWORD: INCORRECT_PASSWORD_PROFILE_EDIT_ERROR
        } = {}
    } = {}
} = constants;



export const userSearch = ({
    usersCollection = required('usersCollection'),
    logger = required('logger', 'You must pass in a logger for this function to use')
}) => coroutine(function* (req, res) {
    const {
        query: {
            name,
            type,
            excludeSelf = false
        } = {}
    } = req;

    if (!name) {
        return sendError({
            res,
            status: 400,
            message: 'Name must be included in a users search'
        });
    }

    let users;

    try {
        users = yield findUsersByName({
            usersCollection,
            name,
            type,
            currentUserId: convertToObjectId(req.user._id),
            excludeSelf
        });
    } catch (e) {
        logger.error(e, `Error finding users for name: ${name}`);

        return sendError({
            res,
            status: 400,
            message: 'There was an error processing your request'
        });
    }

    return res.json({
        users: users.map(transformUserForOutput)
    });
});

export const createUser = ({
    usersCollection = required('usersCollection'),
    verificationsCollection = required('verificationsCollection'),
    logger = required('logger', 'You must pass in a logger for this function to use')
}) => coroutine(function* (req, res) {
    const {
        body: {
            name,
            email,
            password
        } = {},
        file: {
            filename,
            mimetype,
            path
        } = {}
    } = req;

    const {
        UPLOADS_RELATIVE_PATH,
        DEFAULT_PROFILE_PICTURE_RELATIVE_PATH,
        JWT_SECRET
    } = process.env;

    // Start with the default profile picture
    let profilePictureLink = DEFAULT_PROFILE_PICTURE_RELATIVE_PATH;

    if (filename && mimetype && path) {
        // We have an image upload that we need to include in the saved user
        // NOTE: Validation middleware has already run by the time we get here so we can assume the image is valid
        profilePictureLink = `${UPLOADS_RELATIVE_PATH}${filename}`
    }

    if (!name || !email || !password) {
        logger.warn(req.body, 'Malformed body for user creation');

        return sendError({
            res,
            status: 400,
            message: 'Creating a user requires a name, an email, and a password',
            errorKey: MISSING_VALUES_SIGN_UP_ERROR
        });
    }

    // First see if a user with this email exists
    let user = null;
    try {
        user = yield getUserByEmail({
            email,
            usersCollection
        });
    } catch (e) {
        logger.error(e, `Error checking if user with email: ${email} exists`);

        return sendError({
            res,
            status: 500,
            message: 'Could not sign up',
            errorKey: GENERIC_SIGN_UP_ERROR
        });
    }

    if (!isEmpty(user)) {
        logger.warn({ email }, 'Attempt to sign up with existing user email');

        return sendError({
            res,
            status: 400,
            message: `A user with email: ${email} already exists`,
            errorKey: EXISTING_EMAIL_ERROR
        });
    }

    // No user with this email exists so lets make one
    const hashedPassword = yield generatePasswordHash(password);
    let savedUser;

    try {
        savedUser = yield insertInDb({
            collection: usersCollection,
            document: {
                name,
                email,
                password: hashedPassword,
                isEmailConfirmed: false,
                isInactive: false,
                profilePictureLink
            },
            returnInsertedDocument: true
        });
    } catch (e) {
        logger.error({ err: e, name, email }, 'Error saving new user to database');

        return sendError({
            res,
            status: 500,
            message: 'Could not sign up',
            errorKey: GENERIC_SIGN_UP_ERROR
        });
    }

    // Now that the user has been saved, return a jwt encapsulating the new user (transformered for output)
    const token = jwt.sign(transformUserForOutput(savedUser), JWT_SECRET);

    return res.json({
        token
    });
});

// Allows us to edit attributes of a user other than profile picture, createdAt, and password
export const editUser = ({
    usersCollection = required('usersCollection'),
    logger = required('logger', 'You need to pass in a logger for this function to use')
}) => coroutine(function* (req, res) {
    const {
        id
    } = req.params;

    // We can only update the name and profile picture using this route
    const {
        body: {
            name,
            password,
            oldPassword
        } = {},
        file: {
            filename,
            mimetype,
            path
        } = {}
    } = req;

    const {
        UPLOADS_RELATIVE_PATH,
    } = process.env;

    let hashedNewPassword;

    if (password) {
        // We need to make sure the old password was passed and it is correct
        if (!oldPassword) {
            logger.warn({ name, id }, 'Attempt to update password without providing old password');

            return sendError({
                res,
                status: 400,
                message: 'You must provide the current password of a user to change the password'
            });
        }

        // Get the user that goes with this id and compare the passwords
        let user;

        try {
            user = yield getById({
                collection: usersCollection,
                id
            });
        } catch (e) {
            logger.error(e, `Error fetching user with id: ${id} for checking old password before password update`);

            return sendError({
                res,
                status: 400,
                message: 'Could not update user',
                errorKey: GENERIC_PROFILE_EDIT_ERROR
            });
        }

        let isPasswordValid;

        try {
            isPasswordValid = yield comparePasswords(oldPassword, user.password);
        } catch (e) {
            logger.error(e, 'Error during password comparison for password update');

            return sendError({
                res,
                status: 500,
                message: 'Could not update user',
                errorKey: GENERIC_PROFILE_EDIT_ERROR
            });
        }

        if (!isPasswordValid) {
            return sendError({
                res,
                status: 400,
                message: 'Incorrect password',
                errorKey: INCORRECT_PASSWORD_PROFILE_EDIT_ERROR
            });
        }

        // Now that we know everything is valid, hash the new password
        hashedNewPassword = yield generatePasswordHash(password);
    }

    let profilePictureLink;

    if (filename && mimetype && path) {
        // User has updated their profile image
        profilePictureLink = `${UPLOADS_RELATIVE_PATH}${filename}`;
    }

    // Make sure the update does not contain any null values
    let update = {};
    update = extendIfPopulated(update, 'name', name);
    update = extendIfPopulated(update, 'profilePictureLink', profilePictureLink);
    update = extendIfPopulated(update, 'password', hashedNewPassword);

    let newUser;

    try {
        newUser = yield findAndUpdate({
            collection: usersCollection,
            query: { _id: id },
            update
        });
    } catch (e) {
        logger.error(e, `Error updating user with id: ${id}`);

        return sendError({
            res,
            status: 500,
            message: 'Could not update user',
            errorKey: GENERIC_PROFILE_EDIT_ERROR
        });
    }

    // Now that the value of the user has been changed, the front end needs a new token that reflects these changes
    const transformedNewUser = transformUserForOutput(newUser);
    const token = jwt.sign(transformedNewUser, process.env.JWT_SECRET);

    return res.json({
        user: transformedNewUser,
        token
    });
});

export const deleteCurrentUser = ({
    usersCollection = required('usersCollection'),
    logger = required('logger', 'You need to pass in a logger for this function to use')
}) => coroutine(function* (req, res) {
    const {
        _id: id
    } = req.user;

    try {
        yield removeUserById({
            id,
            usersCollection
        });
    } catch (e) {
        logger.error(e, `Error removing user with id: ${id}`);

        return sendError({
            res,
            status: 500,
            message: 'Could not delete user'
        });
    }

    return res.json({
        user: transformUserForOutput(req.user)
    });
});
