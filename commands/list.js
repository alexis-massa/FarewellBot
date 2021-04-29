const { getAll } = require('../database');
module.exports = {
    name: 'list',
    description: 'list all keys from db',
    usage: '?list',
    accessableby: 'Members',
    aliases: ['ls'],
    execute(message) {
        // const msg = '';

        // const content = getAll();

        // keys.forEach(key => {
        //     console.log(`${key} : ${}`);
        // });

        // message.channel.send('Hello');
    }
};