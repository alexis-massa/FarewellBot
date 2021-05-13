const mongoose = require('mongoose');

const namesSchema = mongoose.Schema({
    discord_id: String,
    localizor_name: String,
    override_name: String
});

module.exports = mongoose.model('Names', namesSchema);