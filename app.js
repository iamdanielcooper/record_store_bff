const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Nothing...');
});

const releaseDetails = require('./releaseDetails/routes/routes');
app.use(`/v1/release-details`, releaseDetails);

const inventoryDetails = require('./inventory/routes/routes');
app.use('/v1/inventory', inventoryDetails);

module.exports = app;
