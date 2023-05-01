const Details = require('./model');
const { Discogs } = require('../../integrations/discogs/model');

describe('Details model tests', () => {
    test('Model correctly parses details from downstream', async () => {
        const mockResponse = {
            pagination: { page: 1, pages: 1, per_page: 50, items: 1, urls: {} },
            results: [
                {
                    country: 'Europe',
                    year: '2017',
                    format: [Array],
                    label: [Array],
                    type: 'release',
                    genre: [Array],
                    style: [Array],
                    id: 10162392,
                    barcode: [Array],
                    user_data: [Object],
                    master_id: 31923,
                    master_url: 'https://api.discogs.com/masters/31923',
                    uri: '/release/10162392-The-Distillers-Coral-Fang',
                    catno: '081227941468',
                    title: 'The Distillers - Coral Fang',
                    thumb: 'https://i.discogs.com/mBhgAZbZ7JyZ_U5whri6zUTgDWQre-D0_3vwb90fmdk/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMTYy/MzkyLTE0OTM5MDg0/NjEtNTE5MC5qcGVn.jpeg',
                    cover_image:
                        'https://i.discogs.com/AOZXeCrBhW5UyNNk7ei0TrrMzuiOcU_C9cuKvHtdwD0/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMTYy/MzkyLTE0OTM5MDg0/NjEtNTE5MC5qcGVn.jpeg',
                    resource_url: 'https://api.discogs.com/releases/10162392',
                    community: [Object],
                    format_quantity: 1,
                    formats: [Array],
                },
            ],
        };

        Discogs.getInfo = jest.fn();
        Discogs.getInfo.mockReturnValue(mockResponse);

        const result = await Details.addDetails('validBarcode');

        expect(result.year).toEqual(mockResponse.results[0].year);
        expect(result.formats).toEqual(mockResponse.results[0].format);
        expect(result.cover).toEqual(mockResponse.results[0].cover_image);
        expect(result.title).toEqual(
            mockResponse.results[0].title.split('-')[1].trim()
        );
        expect(result.artist).toEqual(
            mockResponse.results[0].title.split('-')[0].trim()
        );
        expect(result.barcode).toEqual('validBarcode');
    });
});
