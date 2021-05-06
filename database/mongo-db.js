// import
const { MongoClient } = require('mongodb');

// config
// require('dotenv').config(); // ! doesn't work

// ! put URI in .env
const client = new MongoClient('mongodb+srv://iLoxe:hcRyf6Y4KeP4XBFt@cluster0.6hhzu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true });
const db = client.db('farewell-db');
const collection = db.collection('names');

// self-invoking fucntion
(async () => {
    try {
        await client.connect();
        await create(collection, {
            default_name: "defUsername",
            updated_name: "updated name"
        });
    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }
})();

/**
 * Creates a new name pair in db
 * @param {import('mongodb').Collection} collection : collection
 * @param {JSON} newName : the document to insert
 */
const create = async function (collection, newName) {
    const result = await collection.insertOne(newName);
    console.log(`New name created with the id: ${result.insertedId}`);
};

/**
 * TODO : write this
 * @param {import('mongodb').Collection} collection : collection
 * @param {String} name : name to find
 */
const findOneByDefName = async function (collection, name) {
    collection.findOne({ name: name });
}
