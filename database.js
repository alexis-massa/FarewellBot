// import
const Database = require('@replit/database');

// database
const db = new Database();

const setup = async function () {
    await db.set('key', 'value');
    await db.set('key3', 'value3');
    await db.set('key2', 'value2');
};

const getAll = async function () {
    await db.list().then(keys => {
        keys.forEach(key => {
            console.log(db.get(key));
        });
    });
};

// const rename = function (username, wishName) {
//     db.get(username).then(value => {
//         db.set()
//     });
// }


module.exports = { setup, getAll };