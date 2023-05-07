const InventoryRecord = require('../models/model');

const addNewInventoryRecord = async (req, res) => {
    try {
        const newInventoryRecord = await InventoryRecord.addNewInventoryRecord(
            req.body
        );
        res.status(200).send(newInventoryRecord);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { addNewInventoryRecord };
