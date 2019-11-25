const jwt = require('jsonwebtoken');
const transporter = require('./transporter');

const { Sent } = require('../../models');

module.exports = {
    async sendMail (req, res) {
        try {
            const {
                token, receiver, subject, text,
            } = req.body;

            const options = {
                from: 'tadeas.elective@gmail.com',
                to: receiver,
                subject,
                text,
            };

            await transporter.sendMail(options, async (error) => {
                if (!error) {
                    // get user id from access token
                    const tokenDecoded = jwt.decode(token, { complete: true });
                    const userId = tokenDecoded.payload.id;
                    // create sent object with user's id
                    const sent = {
                        receiver: options.to,
                        subject: options.subject,
                        text: options.text,
                        user_id: userId,
                    };
                    await Sent.create(sent);

                    res.status(200).json({
                        message: 'Message sent successfully',
                        receiver: options.to,
                        timestamp: Date.now(),
                        status: 200,
                    });
                }
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSent (req, res) {
        try {
            // TODO *********

            // get sent emails of authenticated user
            const sentMails = await Sent.findAll({
                where: {
                    user_id: 1,
                },
                limit: 20,
            });
            res.send(sentMails);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
