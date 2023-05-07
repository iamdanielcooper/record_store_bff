const request = require('supertest');
const server = require('../../app');
// const ReleaseDetails = require('../models/model');

describe('POST /inventory/{barcode} endpoint tests', () => {
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

    test('Requesting POST /inventory/{valid_barcode} with all required and optional fields returns 200', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '2012',
            barcode: '122344',
            pressingColour: 'Magenta',
            stock: 3,
            isUsed: false,
            price: 2.22,
            listen: 'http://example.com',
            cover: 'http://example.com',
        };

        request(api)
            .post('/v1/inventory/081227941468')
            .send(requestBody)
            .expect(200, done);
    });

    test('Requesting POST /inventory/{valid_barcode} with only required fields returns 200', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '2012',
            barcode: '122344',
            pressingColour: 'Magenta',
            stock: 3,
            isUsed: false,
            price: 2.22,
            cover: 'http://example.com',
        };

        request(api)
            .post('/v1/inventory/081227941468')
            .send(requestBody)
            .expect(200, done);
    });

    test('Requesting POST /inventory/{valid_barcode} with no body returns 400', done => {
        request(api).post('/v1/inventory/081227941468').expect(400, done);
    });

    test('Requesting POST /inventory/{valid_barcode} with some required fields absent returns 400', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '',
            price: 2.22,
        };

        request(api)
            .post('/v1/inventory/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /inventory/{valid_barcode} with only optional fields returns 400', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '',
            price: 2.22,
            listen: 'http://example.com',
        };

        request(api)
            .post('/v1/inventory/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /inventory/{valid_barcode} with stock as a string returns 400', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '',
            barcode: '122344',
            pressingColour: 'Magenta',
            stock: 'Threehundred',
            isUsed: false,
            price: 2.22,
        };

        request(api)
            .post('/v1/inventory/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /inventory/{valid_barcode} with price as a string returns 400', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '',
            barcode: '122344',
            pressingColour: 'Magenta',
            stock: 'Threehundred',
            isUsed: false,
            price: '2.22',
        };

        request(api)
            .post('/v1/inventory/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /inventory/{valid_barcode} with empty strings for required values 400', done => {
        const requestBody = {
            title: '',
            artist: 'The Knife',
            year: '2012',
            barcode: '122344',
            pressingColour: 'Magenta',
            stock: 2,
            isUsed: false,
            price: '2.22',
        };

        request(api)
            .post('/v1/inventory/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /inventory/{valid_barcode} with none positive integers for stock returns 400', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '2002',
            barcode: '122344',
            pressingColour: 'Magenta',
            stock: -1,
            isUsed: false,
            price: '2.22',
        };

        request(api)
            .post('/v1/inventory/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /inventory/{valid_barcode} with 0 for stock returns 200', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '2002',
            barcode: '122344',
            pressingColour: 'Magenta',
            stock: 0,
            isUsed: false,
            price: '2.22',
            cover: 'http://example.com',
        };

        request(api)
            .post('/v1/inventory/081227941468')
            .send(requestBody)
            .expect(200, done);
    });
});
