const request = require('supertest');
const server = require('../../app');
const ReleaseDetails = require('../models/model');

describe('GET /release-details/{barcode} endpoint tests', () => {
    let api;

    beforeAll(() => {
        api = server.listen(10, () =>
            console.log('Test server running on port 0')
        );
    });

    afterAll(done => {
        console.log('Stopping test server');
        api.close(done);
    });

    test('Requesting GET /release-details/{valid_barcode} returns 200', done => {
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

        ReleaseDetails.getByBarcode = jest.fn();
        ReleaseDetails.getByBarcode.mockReturnValue(mockResponse);

        request(api).get('/v1/release-details/081227941468').expect(200, done);
    });

    test('Requesting GET /release-details/{invalid_barcode} returns 404', done => {
        ReleaseDetails.getByBarcode = jest.fn();
        ReleaseDetails.getByBarcode.mockImplementation(
            new Error('No results found')
        );

        request(api)
            .get('/v1/release-details/iamnotabarcode')
            .expect(404, done);
    });

    test('Requesting GET /details with no parameter returns 404', done => {
        request(api).get('/v1/release-details/').expect(404, done);
    });

    test('Request GET GET /release-details/{valid_barcode} returns all required fields', async () => {
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

        ReleaseDetails.getByBarcode = jest.fn();
        ReleaseDetails.getByBarcode.mockReturnValue(mockResponse);

        const temp = await request(api).get('/v1/release-details/123');

        expect(temp.body.artist).toBeDefined();
        expect(temp.body.year).toBeDefined();
        expect(temp.body.genre).toBeDefined();
        expect(temp.body.formats).toBeDefined();
        expect(temp.body.cover).toBeDefined();
    });

    test('Request GET GET /release-details/{valid_barcode} returns correct data', async () => {
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

        ReleaseDetails.getByBarcode = jest.fn();
        ReleaseDetails.getByBarcode.mockReturnValue(mockResponse);

        const temp = await request(api).get('/v1/release-details/123');

        expect(temp.body.title).toEqual(mockResponse.title);
        expect(temp.body.artist).toEqual(mockResponse.artist);
        expect(temp.body.year).toEqual(mockResponse.year);
        expect(temp.body.genre).toEqual(mockResponse.genre);
        expect(temp.body.formats).toEqual(mockResponse.formats);
        expect(temp.body.cover).toEqual(mockResponse.cover);
        expect(temp.body.barcode).toEqual(mockResponse.barcode);
    });
});
