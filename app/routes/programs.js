import express from 'express';

import { required } from '../components/custom-utils';
import { getChildLogger } from '../components/log-factory';
import {
    processFileUpload,
    error as handleUploadError
} from '../components/upload-middleware';

import { createProgram, deletePrograms, getPrograms } from '../controllers/programs';
import { isAuthenticated } from '../controllers/utils';

import constants from '../../common/constants';

const {
    USER_TYPES: {
        ORGANISATION: ORGANISATION_USER_TYPE
    } = {}
} = constants;


export default ({
    db = required('db'),
    baseLogger = required('baseLogger')
}) => {
    const programRouter = express.Router();

    programRouter.post('/', [
        isAuthenticated,
        processFileUpload({
            name: 'programs'
        }),
        createProgram({
            programsCollection: db.collection('programs'),
            logger: getChildLogger({
                baseLogger,
                additionalFields: {
                    module: 'api-create-programs'
                }
            })
        }),
        handleUploadError({
            logger: getChildLogger({
                baseLogger,
                additionalFields: {
                    module: 'api-programs-create-upload-errors'
                }
            })
        })
    ]);

    programRouter.delete('/', [
        isAuthenticated,
        deletePrograms({
            programsCollection: db.collection('programs'),
            logger: getChildLogger({
                baseLogger,
                additionalFields: {
                    module: 'api-delete-programs'
                }
            })
        })
    ]);

    programRouter.get('/', getPrograms({
        programsCollection: db.collection('programs'),
        logger: getChildLogger({
            baseLogger,
            additionalFields: {
                module: 'api-get-programs'
            }
        })
    }));

    return programRouter;
}