const express = require('express');
const app = express();

app.all('/', (req, res) => {
    res.send('Bot running');
});

const port = process.env.PORT || 3001;

function keepAlive() {
    app.listen(port, () => {
        console.log(`App runnning on port : ${port}`);
    });
}

module.exports = keepAlive;