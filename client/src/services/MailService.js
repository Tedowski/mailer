import api from './api'

export default {
    getInbox () {
        return api.get('/inbox')
    },
    getSent () {
        return api.get('/sent')
    },
    sendMail () {
        return api.post('/send')
    }
}