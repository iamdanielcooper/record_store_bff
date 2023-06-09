const { Discogs } = require('../../integrations/discogs/model');

class ReleaseDetails {
    constructor(data) {
        this.barcode = data[0].barcode;
        this.artist = data[0].title.split('-')[0].trim();
        this.title = data[0].title.split('-')[1].trim();
        this.year = data[0].year;
        this.genre = data[0].genre;
        this.formats = data[0].formats;

        this.pressingColours = this.getAllColours(data);

        this.cover = data[0].cover_image;
    }

    static create(discogsData) {
        return new ReleaseDetails(discogsData);
    }

    static async getByBarcode(barcode) {
        const releaseDetails = await Discogs.getInfo(barcode);

        if (releaseDetails.pagination.items === 0) {
            throw new Error('No results found');
        } else {
            const details = new ReleaseDetails(releaseDetails.results);
            details.barcode = barcode;

            return details;
        }
    }

    getAllColours = albumDetailsArray => {
        return [
            ...new Set(
                albumDetailsArray.map(item =>
                    !item.formats || !item.formats[0].text
                        ? 'Black'
                        : item.formats[0].text
                )
            ),
        ];
    };
}

module.exports = ReleaseDetails;
