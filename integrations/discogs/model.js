const { discogsClient } = require('./connection');

class Discogs {
    constructor(data) {}

    static getInfo(barcode) {
        return new Promise((resolve, reject) => {
            discogsClient.search({ barcode: barcode }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}

module.exports = { Discogs };
