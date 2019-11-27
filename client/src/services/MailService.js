import api from './api';

export default {
    getSent (token) {
        return api.get(`/sent?token=${token}`);
    },
    sendMail (data, token) {
        return api.post(`/send?token=${token}`, data);
    },
};
