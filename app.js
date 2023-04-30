const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Nothing...');
});

const details = require('./details/routes/routes');
app.use(`/v1/details`, details);

module.exports = app;
