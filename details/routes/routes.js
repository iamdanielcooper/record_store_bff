const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

// define the home page route
router.get('/:barcode', controller.getByBarcode);

module.exports = router;