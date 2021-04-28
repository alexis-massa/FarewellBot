// import
const Database = require('@replit/database');

// database
const db = new Database();

const setup = function () {
    db.set('key', 'value');
    db.set('key3', 'value3');
    db.set('key2', 'value2');
};

const getAll = function () {
    db.list().then(keys => {
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