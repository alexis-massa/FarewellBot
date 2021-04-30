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
  add('one', newValue);
  add('txo', newValue);
  add('three', newValue);

  console.log(Array.from(getAllValues()));

    db.get(key).then(value => {
        console.log(value);
        if(value) {
          console.log('update');
          db.set(key, newValue);
        } else {
          console.log('new');
          db.delete(key).then(()=>{
            db.set(key, newValue);
          })
        }
    });

    // db.set(key, value);
};


module.exports = { setup, getAllValues, add };