var DiscogsClient = require('disconnect').Client;
const dotenv = require('dotenv');

dotenv.config();

const discogsClient = new DiscogsClient({
    userToken: process.env.DISCOGS_TOKEN,
}).database();

module.exports = { discogsClient };
