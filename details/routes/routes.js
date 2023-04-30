const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

router.get('/:barcode', controller.getByBarcode);

module.exports = router;
