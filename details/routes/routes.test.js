const request = require('supertest');
const server = require('../../app');

describe('Details endpoint tests', () => {
    let api;

    beforeAll(() => {
        api = server.listen(0, () =>
            console.log('Test server running on port 0')
        );
    });

    afterAll(done => {
        console.log('Stopping test server');
        api.close(done);
    });

    test('Requesting GET /details/{valid_barcode} returns 200', done => {
        request(api).get('/v1/details/081227941468').expect(200, done);
    });

    test('Requesting GET /details/{invalid_barcode} returns 404', done => {
        request(api).get('/v1/details/iamnotabarcode').expect(404, done);
    });

    test('Requesting GET /details with no parameter returns 404', done => {
        request(api).get('/v1/details/').expect(404, done);
    });
});
