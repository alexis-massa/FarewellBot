// import
const mongoose = require('mongoose');
const NAME = require('../models/names');

module.exports = client => {
    /**
     * Find rename by localizor_name
     * @param {String} localizor_name : localizor username
     */
    client.getName = async (localizor_name) => {
        const result = NAME.findOne({ name: localizor_name });
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
     * @param {String} override_name : new name
     */
    client.addRename = async (discord_id, localizor_name, override_name) => {
        const newName = await new NAME({ localizor_name: localizor_name, override_name: override_name });
        const result = newName.save();

        if (result) {
            console.log(`Successfully inserted with id: ${result.insertedId}`);
        } else {
            // ! Trigger error
            console.log('There was an error!');
        }

    };

    client.updateRename = async (localizor_name, override_name) => {
        const collection = client.db('farewell-db').collection('names');
        const result = collection.updateOne(
            { localizor_name: localizor_name },
            { $set: { override_name: override_name } },
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
        await client.addRename({ localizor_name: 'localizor_name', override_name: 'n.1ew n.24ame' });
        await client.addRename({ localizor_name: 'localizor_name1', override_name: 'ne21w4 name2' });
        await client.addRename({ localizor_name: 'localizor_name2', override_name: 'ne33243w name4' });
        await client.addRename({ localizor_name: 'localizor_name3', override_name: 'new12345 name5' });
        await client.addRename({ localizor_name: 'update', name: 'to-update' });
        await client.getName('update');
        await client.updateRename('update', 'updated');
        await client.getName('update');
    };
};