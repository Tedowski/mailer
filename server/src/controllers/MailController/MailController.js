const transporter = require('./transporter');

const { Sent } = require('../../models');

module.exports = {
    async sendMail (req, res) {
        try {
            const options = req.body;

            await transporter.sendMail(options, async (error) => {
                if (!error) {
                    await Sent.create(options);

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
            // TODO *********

            const sentMails = await Sent.findAll({
                limit: 20,
            });
            res.send(sentMails);
            // get sent emails of authenticated user
            // store in database ?
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
