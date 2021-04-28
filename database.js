// import
const Database = require('@replit/database');

// database
const db = new Database();

const setup = function () {
    db.set('key', 'value');
    db.get('key').then(value => { console.log(value); }).catch(e => { console.log(e); });
};

module.exports = { setup };