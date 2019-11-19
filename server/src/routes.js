const MailController = require('./controllers/MailController');

module.exports = (app) => {
    app.get('/inbox',
        MailController.getInbox,
    );
    app.get('/sent',
        MailController.getSent,
    );
    app.post('/send',
        MailController.sendMail,
    );
};
