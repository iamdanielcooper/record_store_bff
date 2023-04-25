const { Details } = require('./model');

const getByBarcode = async (req, res) => {
    const data = await Details.addDetails(req.params.barcode);

    res.send(data);
};

module.exports = { getByBarcode };
