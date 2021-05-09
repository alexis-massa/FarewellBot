// import
const mongoose = require('mongoose');

module.exports = client => {

    /**
     * Find rename by localizor_name
     * @param {String} localizor_name : localizor username
     */
    client.findByName = async (localizor_name) => {

        const collection = client.db('farewell-db').collection('names');
        const result = collection.findOne({ name: localizor_name });
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
    client.addRename = async (localizor_name, new_name) => {
        const collection = client.db('farewell-db').collection('names');
        const result = collection.insertOne({ localizor_name: localizor_name, new_name: new_name });
        if (result) {
            console.log(`Successfully inserted with id: ${result.insertedId}`);
        } else {
            // ! Trigger error
            console.log('There was an error!');
        }

    };

    client.updateRename = async (localizor_name, new_name) => {
        const collection = client.db('farewell-db').collection('names');
        const result = collection.updateOne(
            { localizor_name: localizor_name },
            { $set: { new_name: new_name } },
            { upsert: true }
        );
        if (result) {
            console.log(`Successfully updated ${result.nModified} documents for '${localizor_name}'`);
        } else {
            // ! Trigger error
            console.log('There was an error!');
        }

    };

    /**
     * list all db values
     */
    client.list = async () => {

        const collection = client.db('farewell-db').collection('names');

        collection;
        // const result = collection.find({}).forEach(document => {
        //     console.log(document);
        // });

    };

    // here for test purpose
    client.test = async () => {
        await client.list();
        await client.addRename({ localizor_name: 'localizor_name', new_name: 'n.1ew n.24ame' });
        await client.addRename({ localizor_name: 'localizor_name1', new_name: 'ne21w4 name2' });
        await client.addRename({ localizor_name: 'localizor_name2', new_name: 'ne33243w name4' });
        await client.addRename({ localizor_name: 'localizor_name3', new_name: 'new12345 name5' });
        await client.addRename({ localizor_name: 'update', name: 'to-update' });
        await client.findByName('update');
        await client.updateRename('update', 'updated');
        await client.findByName('update');
    };
};