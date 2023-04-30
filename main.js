const app = require('./app');
require('dotenv').config();

const start = port => {
    app.listen(port, () => {
        console.log(`server started on port ${port}`);
    });
};

start(process.env.PORT);
