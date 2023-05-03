const request = require('supertest');
const server = require('../../app');
const Details = require('../models/model');

describe('GET /details/{barcode} endpoint tests', () => {
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
        const mockResponse = {
            artist: 'The Distillers',
            title: 'Coral Fang',
            year: '2017',
            genre: ['Rock'],
            formats: [
                {
                    name: 'Vinyl',
                    qty: '1',
                    text: 'Red',
                    descriptions: [
                        'LP',
                        'Album',
                        'Record Store Day',
                        'Limited Edition',
                        'Reissue',
                    ],
                },
            ],
            cover: 'https://i.discogs.com/AOZXeCrBhW5UyNNk7ei0TrrMzuiOcU_C9cuKvHtdwD0/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMTYy/MzkyLTE0OTM5MDg0/NjEtNTE5MC5qcGVn.jpeg',
        };

        Details.addDetails = jest.fn();
        Details.addDetails.mockReturnValue(mockResponse);

        request(api).get('/v1/details/081227941468').expect(200, done);
    });

    test('Requesting GET /details/{invalid_barcode} returns 404', done => {
        Details.addDetails = jest.fn();
        Details.addDetails.mockImplementation(new Error('No results found'));

        request(api).get('/v1/details/iamnotabarcode').expect(404, done);
    });

    test('Requesting GET /details with no parameter returns 404', done => {
        request(api).get('/v1/details/').expect(404, done);
    });

    test('Request GET GET /details/{valid_barcode} returns all required fields', async () => {
        const mockResponse = {
            artist: 'The Distillers',
            title: 'Coral Fang',
            year: '2017',
            genre: ['Rock'],
            formats: [
                {
                    name: 'Vinyl',
                    qty: '1',
                    text: 'Red',
                    descriptions: [
                        'LP',
                        'Album',
                        'Record Store Day',
                        'Limited Edition',
                        'Reissue',
                    ],
                },
            ],
            cover: 'https://i.discogs.com/AOZXeCrBhW5UyNNk7ei0TrrMzuiOcU_C9cuKvHtdwD0/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMTYy/MzkyLTE0OTM5MDg0/NjEtNTE5MC5qcGVn.jpeg',
        };

        Details.addDetails = jest.fn();
        Details.addDetails.mockReturnValue(mockResponse);

        const temp = await request(api).get('/v1/details/123');

        expect(temp.body.artist).toBeDefined();
        expect(temp.body.year).toBeDefined();
        expect(temp.body.genre).toBeDefined();
        expect(temp.body.formats).toBeDefined();
        expect(temp.body.cover).toBeDefined();
    });

    test('Request GET GET /details/{valid_barcode} returns correct data', async () => {
        const mockResponse = {
            barcode: '123',
            artist: 'The Distillers',
            title: 'Coral Fang',
            year: '2017',
            genre: ['Rock'],
            formats: [
                {
                    name: 'Vinyl',
                    qty: '1',
                    text: 'Red',
                    descriptions: [
                        'LP',
                        'Album',
                        'Record Store Day',
                        'Limited Edition',
                        'Reissue',
                    ],
                },
            ],
            cover: 'https://i.discogs.com/AOZXeCrBhW5UyNNk7ei0TrrMzuiOcU_C9cuKvHtdwD0/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMTYy/MzkyLTE0OTM5MDg0/NjEtNTE5MC5qcGVn.jpeg',
        };

        Details.addDetails = jest.fn();
        Details.addDetails.mockReturnValue(mockResponse);

        const temp = await request(api).get('/v1/details/123');

        expect(temp.body.title).toEqual(mockResponse.title);
        expect(temp.body.artist).toEqual(mockResponse.artist);
        expect(temp.body.year).toEqual(mockResponse.year);
        expect(temp.body.genre).toEqual(mockResponse.genre);
        expect(temp.body.formats).toEqual(mockResponse.formats);
        expect(temp.body.cover).toEqual(mockResponse.cover);
        expect(temp.body.barcode).toEqual(mockResponse.barcode);
    });
});

describe('GET /details/{barcode} endpoint tests', () => {
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

    test('Requesting POST /details/{valid_barcode} with all required and optional fields returns 200', done => {
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
        };

        request(api)
            .post('/v1/details/081227941468')
            .send(requestBody)
            .expect(200, done);
    });

    test('Requesting POST /details/{valid_barcode} with only required fields returns 200', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '2012',
            barcode: '122344',
            pressingColour: 'Magenta',
            stock: 3,
            isUsed: false,
            price: 2.22,
        };

        request(api)
            .post('/v1/details/081227941468')
            .send(requestBody)
            .expect(200, done);
    });

    test('Requesting POST /details/{valid_barcode} with no body returns 400', done => {
        request(api).post('/v1/details/081227941468').expect(400, done);
    });

    test('Requesting POST /details/{valid_barcode} with some required fields absent returns 400', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '',
            price: 2.22,
        };

        request(api)
            .post('/v1/details/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /details/{valid_barcode} with only optional fields returns 400', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '',
            price: 2.22,
            listen: 'http://example.com',
        };

        request(api)
            .post('/v1/details/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /details/{valid_barcode} with stock as a string returns 400', done => {
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
            .post('/v1/details/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /details/{valid_barcode} with price as a string returns 400', done => {
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
            .post('/v1/details/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /details/{valid_barcode} with empty strings for required values 400', done => {
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
            .post('/v1/details/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /details/{valid_barcode} with none positive integers for stock returns 400', done => {
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
            .post('/v1/details/081227941468')
            .send(requestBody)
            .expect(400, done);
    });

    test('Requesting POST /details/{valid_barcode} with 0 for stock returns 200', done => {
        const requestBody = {
            title: 'Deep Cuts',
            artist: 'The Knife',
            year: '2002',
            barcode: '122344',
            pressingColour: 'Magenta',
            stock: 0,
            isUsed: false,
            price: '2.22',
        };

        request(api)
            .post('/v1/details/081227941468')
            .send(requestBody)
            .expect(200, done);
    });
});
