const transporter = require('./transporter');

module.exports = {
    async sendMail (req, res) {
        try {
            const options = req.body;

            // eslint-disable-next-line no-unused-vars
            await transporter.sendMail(options, (error, data) => {
                if (error) {
                    // eslint-disable-next-line no-console
                    console.log('Error occurs');
                } else {
                    // eslint-disable-next-line no-console
                    console.log('Email sent');
                    res.status(200).json({
                        message: 'Email sent',
                    });
                }
            });

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
