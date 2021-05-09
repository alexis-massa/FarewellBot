const mongoose = require('mongoose');

const namesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    discord_id: String,
    localizor_name: String,
    asked_name: String
});

module.exports = mongoose.model('Names', namesSchema);