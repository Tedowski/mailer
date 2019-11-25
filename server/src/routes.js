const MailController = require('./controllers/MailController/MailController');
const MailControllerPolicy = require('./policies/MailControllerPolicy');
const AuthController = require('./controllers/AuthController/AuthController');

module.exports = (app) => {
    app.post('/register',
        AuthController.register,
    );
    app.post('/login',
        AuthController.login,
    );
    app.get('/sent',
        // MailControllerPolicy.authorize,
        MailController.getSent,
    );
    app.post('/send',
        MailControllerPolicy.authorize,
        MailController.sendMail,
    );
};
