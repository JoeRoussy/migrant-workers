import { wrap as coroutine } from 'co';

import { required } from '../components/custom-utils';
import { sendError } from './utils';
import { insert as insertInDb } from '../components/db/service';
import { convertToObjectId } from '../components/custom-utils';
import { getProgramsForUser } from '../components/data';

import constants from '../../common/constants';

const {
    ERRORS: {
        PROGRAM_CREATE: {
            MISSING_CUSTOM_QUESTION_NAMES,
            UNEQUAL_QUESTION_ARRAY_LENGTHS,
            GENERIC: GENERIC_CREATE_ERROR
        } = {},
        PROGRAM_FETCH: {
            GENERIC: GENERIC_FETCH_ERROR
        }
    } = {}
} = constants;

export const createProgram = ({
    programsCollection = required('programsCollection'),
    logger = required('logger')
}) => coroutine(function* (req, res) {
    const {
        customQuestionName,
        customQuestionRequired,
        requiresApplication,
        ...programProps
    } = req.body;

    // Make sure none of the customQuestions are left blank
    if (customQuestionName.some(x => !x)) {
        return sendError({
            res,
            status: 400,
            message: 'Custom questions array contained missing values',
            errorKey: MISSING_CUSTOM_QUESTION_NAMES
        });
    }

    // Make sure the names and required arrays are the same length
    if (customQuestionName.length !== customQuestionRequired.length) {
        return sendError({
            res,
            status: 400,
            message: 'Custom question names and required arrays are not the same length',
            errorKey: UNEQUAL_QUESTION_ARRAY_LENGTHS
        });
    }

    // Build up the custom questions array
    let customQuestions = [];

    if (requiresApplication) {
        for (let i = 0; i < customQuestionName.length; i++) {
            customQuestions.push({
                name: customQuestionName[i],
                isRequired: customQuestionRequired[i]
            });
        }
    }

    // Now save the program itself
    let program;

    try {
        program = yield insertInDb({
            collection: programsCollection,
            document: {
                ...programProps,
                requiresApplication,
                customQuestions,
                createdById: convertToObjectId(req.user._id)
            },
            returnInsertedDocument: true
        })
    } catch (e) {
        logger.error(e, 'Error saving new program into db');

        return sendError({
            res,
            status: 500,
            message: 'There was an error saving the program',
            errorKey: GENERIC_CREATE_ERROR
        });
    }

    return res.json({
        success: true,
        message: 'Program created',
        program
    });
});


export const getMyPrograms = ({
    programsCollection = required('programsCollection'),
    logger = required('logger', 'You must pass a logging instance for this function to use')
}) => coroutine(function* (req, res) {
    let programs;

    try {
        programs = yield getProgramsForUser({
            programsCollection,
            userId: req.user._id
        });
    } catch (e) {
        logger.error(e, 'Error getting programs for current user');

        return sendError({
            res,
            status: 500,
            message: 'There was an error saving the program',
            errorKey: GENERIC_FETCH_ERROR
        });
    }

    return res.json({
        programs
    });
});
















