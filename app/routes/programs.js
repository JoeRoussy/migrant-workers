import express from 'express';

import { required } from '../components/custom-utils';
import { getChildLogger } from '../components/log-factory';

import { createProgram, getMyPrograms } from '../controllers/programs';
import { isAuthenticatedAndOfType } from '../controllers/utils';

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
        isAuthenticatedAndOfType(ORGANISATION_USER_TYPE),
        createProgram({
            programsCollection: db.collection('programs'),
            logger: getChildLogger({
                baseLogger,
                additionalFields: {
                    module: 'api-create-program'
                }
            })
        })
    ]);

    programRouter.get('/me',[
        isAuthenticatedAndOfType(ORGANISATION_USER_TYPE),
        getMyPrograms({
            programsCollection: db.collection('programs'),
            logger: getChildLogger({
                baseLogger,
                additionalFields: {
                    module: 'api-get-my-programs'
                }
            })
        })
    ]);

    return programRouter;
}