const express = require('express');

const app = express();

app.all('/', (req, res) => {
    res.send('Bot running');
});

function keepAlive() {
    app.listen(3000, () => {
        console.log('Server is ready !');
    });
}

module.exports = keepAlive;