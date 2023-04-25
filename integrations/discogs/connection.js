var DiscogsClient = require('disconnect').Client;

const discogsClient = new DiscogsClient({
    userToken: process.env.DISCOGS_TOKEN,
}).database();

module.exports = { discogsClient };
