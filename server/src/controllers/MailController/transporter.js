const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tadeas.elective@gmail.com',
        pass: 'AzL3OlPpn3lBrdUJjYOvx6Dm',
    },
});

module.exports = transporter;
