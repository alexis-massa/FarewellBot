const mongoose = require('mongoose');

const codesSchema = mongoose.Schema({
    discord_id: String,
    codes: [String]
});

module.exports = mongoose.model('Codes', codesSchema);