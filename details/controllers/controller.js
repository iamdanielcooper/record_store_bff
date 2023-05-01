const Details = require('../models/model');

const getByBarcode = async (req, res) => {
    try {
        const data = await Details.addDetails(req.params.barcode);
        res.send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = { getByBarcode };
