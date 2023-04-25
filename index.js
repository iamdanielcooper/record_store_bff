const { app } = require('./app');
const version = process.env.VERSION;

app.get('/', (req, res) => {
    res.send('Nothing...');
});

const details = require('./details/routes');
app.use(`/${version}/details`, details);
