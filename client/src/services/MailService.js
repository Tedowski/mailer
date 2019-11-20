import api from './api';

export default {
    getInbox () {
        return api.get('/inbox');
    },
    getSent () {
        return api.get('/sent');
    },
    sendMail (data) {
        return api.post('/send', data);
    },
};
