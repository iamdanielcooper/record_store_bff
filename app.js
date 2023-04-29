const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = { app };
