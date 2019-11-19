const request = require('../routes');
const app = require('../app');

describe('getInbox', () => {

    it('succeeds with retrieved inbox', async () => {
        const response = await get('inbox')
            .expect(200);
    })

});

// a helper function to make a GET request.
function get(url){
    const httpRequest = request(app).get(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://' + process.env.HOST + ':' + process.env.PORT);
    return httpRequest;
}
