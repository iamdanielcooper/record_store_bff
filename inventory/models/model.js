class InventoryRecord {
    constructor(data) {
        this.title = data.title;
        this.artist = data.artist;
        this.year = data.year;
        this.recordLabel = data.recordLabel;
        this.genre = data.genre;
        this.barcode = data.barcode;
        this.pressingColour = data.pressingColour;
        this.stock = data.stock;
        this.isUsed = data.isUsed;
        this.price = data.price;
        this.listen = data.listen ? data.listen : null;
        this.cover = data.cover;
    }

    static create(data) {
        return new InventoryRecord(data);
    }

    static addNewInventoryRecord(data) {
        return this.create(data);
    }

    // TODO
    static getInventoryRecord(barcode) {}

    // TODO
    static updateStock(barcode) {}

    // TODO
    static removeInventoryRecord(barcode) {}

    // TODO
    static updateInventoryRecord(barcode) {}
}

module.exports = InventoryRecord;
