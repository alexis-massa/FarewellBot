// import
const NAME = require('../database/models/names');
const CODES = require('../database/models/codes');
require('dotenv').config({ path: '../.env' });

module.exports = (client) => {
  /**
   * * UNUSED
   * find rename by localizor_name and log it
   * @param {String} localizor_name : localizor username
   */
  client.getName = async (localizor_name) => {
    const result = NAME.findOne({ name: localizor_name });
    if (result) {
      console.log(`Found a rename for '${localizor_name}': ${result}`);
    } else {
      console.log(`No rename found for '${localizor_name}'`);
    }
  };

  /**
   * Add rename in database
   * @param {String} localizor_name localizor username
   * @param {String} override_name new name
   */
  client.addRename = async (discord_id, localizor_name, override_name) => {
    // find one and update (filter , update to apply , options)
    const res = await NAME.findOneAndUpdate(
      { discord_id: discord_id, localizor_name: localizor_name },
      { override_name: override_name },
      { new: true, upsert: true, rawResult: true }
    ).catch((err) => console.error(err));
    if (res) {
      if (res.lastErrorObject.updatedExisting) {
        console.log(`Successfully inserted with id: ${res.value._id}`);
        return { result: 'inserted', id: res.value._id };
      } else {
        console.log(`Successfully updated with id: ${res.value._id}`);
        return { result: 'updated', id: res.value._id };
      }
    }
  };

  /**
   * * UNUSED
   * log all db values
   */
  client.list = async () => {
    await NAME.find({}).then((names) => {
      names.forEach((name) => {
        console.log(`${name}`);
      });
    });
  };

  /**
   * Checks if code is already redeemed
   * @param {*} code : redeemed code
   * @returns boolean
   */
  client.isRedeemed = async (code) => {
    const res = await CODES.find({ code: code }).catch((err) => console.error(err));
    return (res.length > 0);
  };

  /**
   * Redeem code
   * @param {*} code : code to redeem
   * @returns boolean
   */
  client.redeem = async (code) => {
    const res = await new CODES({ code: code }).save((err) => {
      if(err) return false;
    });
    return res;
  };
};