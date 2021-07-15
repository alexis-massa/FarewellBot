// import
const CryptoJS = require('crypto-js');
require('dotenv').config({ path: '../.env' });

module.exports = (client) => {
  /**
   * Decrypt string
   * @param {String} code : code to decrypt
   * @returns JSON
   */
  client.decrypt = (code) => {
    // encryption KEY and IV
    const key = CryptoJS.enc.Utf8.parse(process.env.ENCRYPTION_KEY);
    const iv = CryptoJS.enc.Utf8.parse(process.env.ENCRYPTION_IV);

    // Base64 decryption
    const baseResult = CryptoJS.enc.Base64.parse(code);
    // Base64 decryption
    const ciphertext = CryptoJS.enc.Base64.stringify(baseResult);
    // AES decryption
    const decryptResult = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC
    });
    // Decrypted to Utf8
    const resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();
    // return Decrypted Utf8 to JSON
    return JSON.parse(resData);
  };
};
