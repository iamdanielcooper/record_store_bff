var Datastore = require('nedb');
const db = new Datastore({ filename: 'path/to/datafile', autoload: true });

const seed = async (req, res) => {
    try {
        console.log('Seeding database...');
        db.insert(req.body, (err, newDoc) => {
            if (err) {
                throw new Error('Error adding to database');
            } else {
                res.status(200).send(newDoc);
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getByBarcode = async (req, res) => {
    try {
        await db.findOne({ barcode: req.params.barcode }, (err, document) => {
            if (err) {
                throw new Error('Error searching by barcode');
            }
            res.status(200).send(document);
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { seed, getByBarcode };
