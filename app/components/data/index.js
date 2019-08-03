import moment from 'moment';

import {
    required,
    print,
    convertToObjectId,
    RethrownError,
    getUniqueHash
} from '../custom-utils';
import { insert as insertInDb, findAndUpdate } from '../db/service';
import constants from '../../../common/constants';

const {
    VERIFICATION_TYPES: {
        EMAIL: EMAIL_VERIFICATION_TYPE
    } = {},
    PASSWORD_RESET: {
        MAX_REQUEST_DAYS: PASSWORD_RESET_DURATION_DAYS
    } = {}
} = constants;


export const getUserByEmail = async({
    usersCollection = required('usersCollection'),
    email = required('email')
}) => {
    try {
        return await usersCollection.findOne({
            email,
            isInactive: {
                $ne: true
            }
        });
    } catch (e) {
        throw new RethrownError(e, `Error getting a user with the email ${email}`);
    }
};


export const findUsersByName = async({
    usersCollection = required('usersCollection'),
    name = required('name'),
    type,
    currentUserId,
    excludeSelf
}) => {
    // NOTE: We enclose the name in double quotes because we want it to be treated as a phrase.
    // Typing a first and last name should narrow results, not expand them.
    // Or logic is default for tokens in text search: https://docs.mongodb.com/manual/text-search/
    if (excludeSelf && !currentUserId) {
        throw new Error('You need to pass a currentUserId if you want to exclude the current user ');
    }

    let matchQuery = {
        $text: {
            $search: `"${name}"`,
            $language: 'english'
        }
    };

    if (excludeSelf) {
        matchQuery._id = {
            $ne: currentUserId
        };
    }

    if (type === userTypes.tenant) {
        matchQuery.isLandlord = {
            $ne: true
        };
    } else if (type === userTypes.landlord) {
        matchQuery.isLandlord = true;
    }

    try {
        return await usersCollection.aggregate([
            {
                $match: {
                    ...matchQuery
                }
            }
        ]).toArray();
    } catch (e) {
        throw new RethrownError(e, `Error search for users with the name ${name}`);
    }
}


// Makes a verification document and returns a link a user can use to verify their email
export const getEmailConfirmationLink = async({
    user = required('user'),
    verificationsCollection = required('verificationsCollection')
}) => {
    const {
        _id: userId
    } = user;

    const {
        ROOT_URL = required('ROOT_URL'),
    } = process.env;

    const urlIdentifyer = await getUniqueHash(user);

    // Now save the verification document
    try {
        await insertInDb({
            collection: verificationsCollection,
            document: {
                urlIdentifyer,
                userId,
                isCompeted: false,
                type: EMAIL_VERIFICATION_TYPE
            }
        })
    } catch (e) {
        throw new RethrownError(e, `Error creating email verification document for user with id: ${userId}`);
    }

    // Return a link the user can use to confirm their profile
    return `${ROOT_URL}/api/verify/email/${urlIdentifyer}`;
};


export const findVerificationDocument = async({
    verificationsCollection = required('verificationsCollection'),
    urlIdentifyer = required('urlIdentifyer'),
    type = required('type')
}) => {
    try {
        return await verificationsCollection.findOne({
            urlIdentifyer,
            type
        });
    } catch (e) {
        throw new RethrownError(e, `Error finding verification document of type: ${type} with urlIdentifyer: ${urlIdentifyer}`);
    }
};


// Mark a user as inactive if they delete their profile
export const removeUserById = async({
    id = required('id'),
    usersCollection = required('usersCollection')
}) => {
    try {
        return await findAndUpdate({
            collection: usersCollection,
            query: {
                _id: id
            },
            update: {
                isInactive: true
            }
        });
    } catch (e) {
        throw new RethrownError(e, `Error removing user with id ${id}`);
    }
};


// Returns a user wrapped in an envalope: { user }
export const getUserForPasswordReset = async({
    passwordResetsCollection = required('passwordResetsCollection'),
    urlIdentifyer = required('urlIdentifyer')
}) => {
    const maxRequestDuration = PASSWORD_RESET_DURATION_DAYS;
    const maxPossibleDateString = moment().add(maxRequestDuration, 'days').endOf('day').toISOString();

    try {
        return await passwordResetsCollection.aggregate([
            {
                $match: {
                    urlIdentifyer,
                    createdAt: {
                        $lte: new Date(maxPossibleDateString) // Need to pass a Date to mongo (not a moment)
                    },
                    expired: {
                        $ne: true
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $project: {
                    _id: 0,
                    passwordResetId: '$_id',
                    user: { $arrayElemAt: [ '$users', 0 ] }
                }
            }
        ]).toArray();
    } catch (e) {
        throw new RethrownError(`Could not find user for password reset with urlIdentifyer: ${urlIdentifyer}`);
    }
};


export const getUsersById = async({
    usersCollection = required('usersCollection'),
    ids = required('ids')
}) => {
    try {
        return await usersCollection.find({"_id":{$in:ids}}).toArray();
    } catch (e) {
        throw new RethrownError(e, `Error could not find users by ids: ${ids}`);
    }
};


// Makes a password reset document and returns a link a user can use to reset their password
export const getPasswordResetLink = async({
    passwordResetsCollection = required('passwordResetsCollection'),
    user = required('user')
}) => {
    const {
        _id: userId
    } = user;

    const {
        FRONT_END_ROOT = required('FRONT_END_ROOT')
    } = process.env;

    const urlIdentifyer = await getUniqueHash(user);

    try {
        await insertInDb({
            collection: passwordResetsCollection,
            document: {
                userId: userId,
                urlIdentifyer,
                expired: false
            }
        });
    } catch (e) {
        throw new RethrownError(e, `Error inserting password reset document for user with id: ${userId}`);
    }

    // Now make a link to reset the email
    return `${FRONT_END_ROOT}/?passwordResetToken=${urlIdentifyer}`;
};


// Finds the programs created by a user
export const getProgramsForUser = async({
    programsCollection = required('programsCollection'),
    userId = required('userId')
}) => {
    const converedUserId = convertToObjectId(userId);

    try {
        return await programsCollection.find({ createdById: converedUserId }).toArray();
    } catch (e) {
        throw new RethrownError(e, `Error finding programs for user with id: ${userId}`);
    }
}