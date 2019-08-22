import { wrap as coroutine } from 'co';
import csv from 'fast-csv';
import fs from 'fs';

import { required } from '../components/custom-utils';
import { sendError } from './utils';
import { insert as insertInDb } from '../components/db/service';
import { convertToObjectId } from '../components/custom-utils';
import { getProgramsForUser, getProgramTypeByName } from '../components/data';

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
    csv.parseFile(req.file.path, { headers: true })
        .on('data', coroutine(function* (data) {
            try {
                yield insertInDb({
                    collection: programsCollection,
                    document: {
                        name: data.name,
                        organizationName: data.organization_name,
                        location: data.location,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        link: data.link,
                        summary: data.summary,
                        description: data.description,
                        endDate: data.end_date || null,
                        programType: data.program_type
                    }
                });
            } catch (e) {
                logger.error(e, 'Error adding programs to db');
            }
        }))
        .on('end', () => {
            fs.unlinkSync(req.file.path);
        })
        .on('error', (e) => {
            logger.error(e, 'Error parsing uploaded csv');

            return sendError({
                res,
                status: 500,
                message: 'There was an error reading the csv upload.',
                errorKey: GENERIC_FETCH_ERROR
            });
        });

    // Might want to send back the number of programs created
    return res.json({
        success: true,
        message: 'Programs created'
    });
});

export const deletePrograms = ({
    programsCollection = required('programsCollection'),
    logger = required('logger', 'You must pass a logging instance for this function to use')
}) => coroutine(function* (req, res) {
    try {
        programsCollection.remove({});
    } catch (e) {
        logger.error(e, 'Error deleting all programs');
    }

    return res.json({
        ok: true
    });
});

export const getPrograms = ({
    programsCollection = required('programsCollection'),
    logger = required('logger', 'You must pass a logging instance for this function to use')
}) => coroutine(function* (req, res) {
    let programs = [];

    try {
        if (req.query.type) {
            programs = yield programsCollection
                .find({ programType: req.query.type })
                .toArray();
        } else {
            programs = yield programsCollection.find({}).toArray();
        }
    } catch (e) {
        logger.error(e, 'Error getting programs');

        return sendError({
            res,
            status: 500,
            message: 'There was an error getting programs',
            errorKey: GENERIC_FETCH_ERROR
        });
    }

    return res.json({ programs });
});
