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

// const rename = function (username, wishName) {
//     db.get(username).then(value => {
//         db.set()
//     });
// }


module.exports = { setup, getAllValues };