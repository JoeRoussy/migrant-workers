import bcrypt from 'bcrypt';

import constants from '../../../common/constants';

const {
    AUTH: {
        SALT_ROUNDS
    } = {}
} = constants;


export const generateHash = async (password) => await bcrypt.hash(password, SALT_ROUNDS);

export const comparePasswords = async (password, hash) => await bcrypt.compare(password, hash);
