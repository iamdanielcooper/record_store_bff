const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const inventoryController = require('../controllers/controller');

const validatePostBody = [
    body('title').isString().notEmpty(),
    body('artist').isString().notEmpty(),
    body('year').isString().notEmpty(),
    body('barcode').isString().notEmpty(),
    body('pressingColour').isString().notEmpty(),
    body('stock').isInt({ min: 0 }),
    body('isUsed').isBoolean().not().optional(),
    body('price').isDecimal().not().optional(),
    body('cover').isURL(),
    body('listen').optional().isURL(),
];

router.post('/:barcode', validatePostBody, async (req, res) => {
    if (validationResult(req).isEmpty()) {
        inventoryController.addNewInventoryRecord(req, res);
    } else {
        res.status(400).send('Req Not validated');
    }
});

module.exports = router;
