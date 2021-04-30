// import
const Database = require('@replit/database');

// database
const db = new Database();

// get all values in db
const getAllValues = async function () {
    const values = db.getAll();
    return values;
};

const empty = function () {
    db.list().then(keys=>{
      for(let i; i > keys.length; i++){
        db.delete(keys[i]);
      }
    });
};

const add = async function (newKey, newValue) {


    await db.get(newKey).then(value => {
      console.log(value);
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
    // db.set(key, value);
};


module.exports = { getAllValues, add };