const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');
router.post('/', controller.seed);
router.get('/:barcode', controller.getByBarcode);

module.exports = router;
