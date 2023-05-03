const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const controller = require('../controllers/controller');

router.get('/:barcode', controller.getByBarcode);

router.post(
    '/:barcode',
    body('title').isString().notEmpty(),
    body('artist').isString().notEmpty(),
    body('year').isString().notEmpty(),
    body('barcode').isString().notEmpty(),
    body('pressingColour').isString().notEmpty(),
    body('stock').isInt({ min: 0 }),
    body('isUsed').isBoolean().not().optional(),
    body('price').isDecimal().not().optional(),
    body('listen').optional().notEmpty(),
    (req, res) => {
        if (validationResult(req).isEmpty()) {
            res.status(200).send('Request validated');
        } else {
            res.status(400).send('Req Not validated');
        }
    }
);

module.exports = router;
