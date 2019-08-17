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
    // const {
    //     customQuestionName,
    //     customQuestionRequired,
    //     requiresApplication,
    //     ...programProps
    // } = req.body;

    console.log(req.body)

    // Now save the program itself
    let program;

    // try {
    //     program = yield insertInDb({
    //         collection: programsCollection,
    //         document: {
    //             ...programProps,
    //             requiresApplication,
    //             customQuestions,
    //             createdById: convertToObjectId(req.user._id)
    //         },
    //         returnInsertedDocument: true
    //     })
    // } catch (e) {
    //     logger.error(e, 'Error saving new program into db');

    //     return sendError({
    //         res,
    //         status: 500,
    //         message: 'There was an error saving the program',
    //         errorKey: GENERIC_CREATE_ERROR
    //     });
    // }

    // Might want to send back the number of programs created
    return res.json({
        success: true,
        message: 'Programs created'
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
















