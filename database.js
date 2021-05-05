// import
const Database = require('@replit/database');

// database
const db = new Database();

// get all keys in db
const getAllKeys = async function () {
    const values = db.getAll();
    return Array.from(values);
};

// get all values in db
const getAllValues = async function () {
    const values = [];
    await getAllKeys().then(keys => {
        for (const key in keys) {
            db.get(key).then(value => {
                values.push(value);
            });
        }
    });
    return values;
};

// add a value in db
const add = async function (newKey, newValue) {
    await db.get(newKey).then(value => {
        if (value) {
            console.log('exists');
            db.set(newKey, newValue);
        } else {
            console.log('not exist');
            db.set(newKey, newValue);
        }
    });
    await db.list().then(keys => {
        console.log(keys);
    });
};


module.exports = { add, getAllValues };