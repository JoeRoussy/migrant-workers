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