import nodemailer from 'nodemailer';
import nodemailerHandlebars from 'nodemailer-express-handlebars';
import inlineCss from 'nodemailer-juice';
import marked from 'marked';
import moment from 'moment';

import { required, RethrownError } from '../custom-utils';
import constants from '../../../common/constants';

const {
    EMAIL: {
        TEMPLATE_EXTENSION,
        TEMPLATE_PATH,
        TEMPLATE_LAYOUT_PATH,
        DEFAULT_LAYOUT,
        TEMPLATE_PARTIALS
    } = {}
} = constants;

// Helpers for handlebars templating
const _helpers = {
    md(text) {
        if (!text) {
            return;
        }

        const renderer = new marked.Renderer();
        renderer.paragraph = (text) => text;

        return marked(text, {
            renderer
        });
    },
    lineEndingsToBreaks(text) {
        if (!text) {
            return;
        }

        return text.replace(/\n/g, '<br>');
    },
    formatDate(date) {
        return moment(date).format('MMMM DD YYYY');
    },
    formatPrice(price){
        return price.toFixed(2);
    }
};

const _sendMessage = async({
    to,
    message,
    subject
}) => {
    const {
        ROOT_URL = required('ROOT_URL'),
        EMAIL_ADDRESS = required('EMAIL_ADDRESS'),
        EMAIL_PASSWORD = required('EMAIL_PASSWORD')
    } = process.env;

    const {
        template,
        context
    } = message;

    // TODO: This will have to change when we set up actual domain for the site
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_ADDRESS,
            pass: EMAIL_PASSWORD
        }
    });

    if (template && context) {
        // This is a templated email
        transporter.use('compile', nodemailerHandlebars({
            viewEngine: {
                extname: TEMPLATE_EXTENSION,
                layoutsDir: TEMPLATE_LAYOUT_PATH,
                defaultLayout: DEFAULT_LAYOUT,
                partialsDir: TEMPLATE_PARTIALS,
                helpers: _helpers
            },
            viewPath: TEMPLATE_PATH,
            extName: TEMPLATE_EXTENSION
        }));

        transporter.use('compile', inlineCss());

        return transporter.sendMail({
            from: EMAIL_ADDRESS,
            to,
            subject,
            template,
            context: {
                rootUrl: ROOT_URL,
                ...context
            }
        });
    }

    // Otherwise the email is just plain text
    return transporter.sendMail({
        from: EMAIL_ADDRESS,
        to,
        subject,
        text: message
    });
};

export const sendSignUpMessage = async({
    user = required('user'),
    emailConfirmationLink = required('emailConfirmationLink')
}) => {
    const {
        name,
        email,
        isLandlord
    } = user;

    const message = {
        context: {
            name,
            email,
            isLandlord,
            emailConfirmationLink
        },
        template: 'signUp'
    };

    try {
        return await _sendMessage({
            to: email,
            message,
            subject: 'Welcome to Roomie!'
        });
    } catch (e) {
        throw new RethrownError(e, `Error sending sign up message to user with email: ${email}`);
    }
};

export const sendPasswordResetEmail = async({
    user = required('user'),
    resetLink = required('resetLink')
}) => {
    const {
        name,
        email
    } = user;

    const message = {
        context: {
            name,
            resetLink
        },
        template: 'resetPassword'
    };

    try {
        return await _sendMessage({
            to: email,
            message,
            subject: 'Password Reset Requested'
        });
    } catch (e) {
        throw new RethrownError(e, `Error sending sign up message to user with email: ${email}`);
    }
};
