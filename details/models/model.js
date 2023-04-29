const { Discogs } = require('../../integrations/discogs/model');

class Details {
    constructor(data) {
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
        return new Details(albumDetails.results[0]);
    }
}

module.exports = { Details };
