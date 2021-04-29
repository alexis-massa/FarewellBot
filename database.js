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
const getAll = async function () {
    const allKeys = [];
    await db.list().then(keys => {
        keys.forEach(key => {
            // console.log(db.get(key));
            allKeys.push(key);
        });
    });
};

// const rename = function (username, wishName) {
//     db.get(username).then(value => {
//         db.set()
//     });
// }


module.exports = { setup, getAll };