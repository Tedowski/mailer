// const nodemailer = require('nodemailer');

module.exports = {
    async sendMail (req, res) {
        try {
            res.status(200).json({
                message: 'mail sent',
            });

            // TODO **********

            // create mail object
            // send email
            // if success -> store in database
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getInbox (req, res) {
        try {
            res.status(200).json({
                message: 'inbox retrieved',
            });

            // TODO *********

            // get inbox of authenticated user
            // store in database ?
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSent (req, res) {
        try {
            res.status(200).json({
                message: 'sent mails retrieved',
            });

            // TODO *********

            // get sent emails of authenticated user
            // store in database ?
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
