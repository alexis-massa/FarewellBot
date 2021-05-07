// imports
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
// config
require('dotenv').config();

// database options
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const state = {
    db: null
};

const connect = (cb) => {
    if (state.db) {
        cb();
    } else {
        MongoClient.connect(process.env.ATLAS_URI, mongoOptions, (err, client) => {
            if (err) {
                cb(err);
            } else {
                state.db = client.db('farewell-db');
                cb();
            }
        });
    }
};

const getDB = () => {
    connect();
    return state.db;
};

const getCollection = () => {
    return getDB().collection('names');
};


module.exports = { getCollection };