<<<<<<< Updated upstream
// imports
const MongoClient = require('mongodb').MongoClient;

// config
// require('dotenv').config(); // ! doesn't work

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const client = new MongoClient('mongodb+srv://iLoxe:hcRyf6Y4KeP4XBFt@cluster0.6hhzu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', mongoOptions);

/**
 * Find rename by localizor_name
 * @param {String} localizor_name : localizor username
 */
const findByName = async function (localizor_name) {
    await client.connect();
    const result = client.db('farewell-db').collection('names').findOne({ name: localizor_name });
    if (result) {
        console.log(`Found a rename for '${localizor_name}':`);
        console.log(result);
    } else {
        console.log(`No rename found for '${localizor_name}'`);
    }

};

/**
 * Add rename in database
 * @param {String} localizor_name : localizor username
 * @param {String} new_name : new name
 */
const addRename = async function (localizor_name, new_name) {
    await client.connect();
    const result = client.db('farewell-db').collection('names').insertOne({ localizor_name: localizor_name, new_name: new_name });
    if (result) {
        console.log(`Successfully inserted with id: ${result.insertedId}`);
    } else {
        // ! Trigger error
        console.log('There was an error!');
    }

};

const updateRename = async function (localizor_name, new_name) {
    await client.connect();
    const result = client.db('farewell-db').collection('names').updateOne(
        { localizor_name: localizor_name },
        { new_name: new_name },
        { upsert: true }
    );
    if (result) {
        console.log(`Successfully updated ${result.nModified} documents for '${localizor_name}'`);
    } else {
        // ! Trigger error
        console.log('There was an error!');
    }

};

const list = async function () {
    await client.connect();

    const result = client.db('farewell-db').collection('names').find({}).forEach(document => {
        console.log(document);
    });


};

module.exports = { findByName, list, addRename };
=======
const { getCollection } = require('./mongo-db');

/**
 * Find rename by default_name
 * @param {String} default_name : localizor username
 */
const findByName = async function (default_name) {
    const result = getCollection().findOne({ name: default_name });
    if (result) {
        console.log(`Found a rename for '${default_name}':`);
        console.log(result);
    } else {
        console.log(`No rename found for '${default_name}'`);
    }
};

const addRename = async function (default_name, new_name) {
    const result = getCollection().insertOne({})
}

module.exports = {};
>>>>>>> Stashed changes
