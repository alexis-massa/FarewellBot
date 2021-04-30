// import
const Database = require('@replit/database');

// database
const db = new Database();

// add default value for test
const setup = function () {
    db.set('key', 'value');
    db.get('key').then(value => { console.log(value); }).catch(e => { console.log(e); });
};

// get all values in db
const getAllValues = async function () {
    const values = db.getAll();
    return values;
};

const add = async function (key, newValue) {

    db.list().then(keys => { console.log(Array.from(keys)); });

    db.get(key).then(value => {
        if (value) {
            console.log('exists');
        } else {
            console.log('not exist');
        }
    });

    // db.set(key, value);
};


module.exports = { setup, getAllValues, add };