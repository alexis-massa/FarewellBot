const mongoose = require('mongoose');

const codesSchema = mongoose.Schema({
    code: String
});

module.exports = mongoose.model('Codes', codesSchema);