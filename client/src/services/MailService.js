import api from './api';

export default {
    getSent () {
        return api.get('/sent');
    },
    sendMail (data) {
        return api.post('/send', data);
    },
};
