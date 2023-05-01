const { Discogs } = require('../../integrations/discogs/model');

class Details {
    constructor(data) {
        this.barcode = data.barcode;
        this.artist = data.title.split('-')[0].trim();
        this.title = data.title.split('-')[1].trim();
        this.year = data.year;
        this.genre = data.genre;
        this.formats = data.formats;
        this.cover = data.cover_image;
    }

    static create(discogsData) {
        return new Details(discogsData);
    }

    static async addDetails(barcode) {
        const albumDetails = await Discogs.getInfo(barcode);

        if (albumDetails.pagination.items === 0) {
            throw new Error('No results found');
        } else {
            const details = new Details(albumDetails.results[0]);
            details.barcode = barcode;

            return details;
        }
    }
}

module.exports = Details;
